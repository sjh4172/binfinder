package com.codestates.auth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

// 클라이언트 측에서 전송된 request Header에 포함된 JWT에 대해 검증 작업을 수행하는 클래스
public class JwtVerificationFilter extends OncePerRequestFilter { // request 당 한 번만 실행되도록(성공이냐 실패냐)

    // JWT를 검증하고 Claims를 얻는데 사용
    private final JwtTokenizer jwtTokenizer;
    // JWT 검증에 성공하면 Authentication 객체에 채울 사용자의 권한을 생성하는데 사용
    private final CustomAuthorityUtils authorityUtils;

    // DI
    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    // JwtVerificationFilter가 작동하는 로직.
    // JWS 토큰을 검증하고, 검증된 토큰에서 클레임 정보를 추출하여 인증 객체(Authentication)를 생성하고('SecurityContextHolder')에 저장한다.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        try{
            // verifyJws 메서드를 통한 클레임을 얻는 과정에서 내부적으로 JWT 서명 검증을 하게 된다.
            // 만약 검증에 실패하한다면
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch(SignatureException se){ // 서명 검증 실패
            request.setAttribute("exception", se);
        }catch (ExpiredJwtException ee) { // JWT 만료
            request.setAttribute("exception", ee);
        } catch (Exception e) { // 그 외 에러
            request.setAttribute("exception", e);
        }

        // 추출된 클레임 정보를 이용하여 인증 객체를 생성한다.
        // 인증 객체를 스프링 시큐리티의 SecurityContextHolder에 저장
        filterChain.doFilter(request, response);
    }

    // 필터링을 수행해야 할 요청인지 여부를 결정하는 메서드.
    // true를 반환하면 필터링을 수행하지 않는다(다음 Filter로 건너뛰도록 한다)
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");  // HTTP 요청의 헤더에서 Authorization 값을 가져온다.

        return authorization == null || !authorization.startsWith("Bearer");  // Authorization값이 없거나 JWT 토큰을 사용하여 인증을 처리하지 않는 요청이라면 true 반환
    }

    // 클라이언트가 서버로 전송한 Authorization 헤더를 받아서 JWT를 검증하고
    // 클레임 정보를 반환하는 메서드

    // JWT에서 claim을 추출(파싱)하는 메서드
    // claim을 추출하는 메서드인데 메서드 이름이 "JWT 검증" 인 이유
    // : JWT 에서 claim이 정상적으로 추출되었다는 의미는 해당 JWT가 정상적인 JWT 라는 것과 같은 의미.
    // JWT의 검증은 JWT를 검증하는 개별적인 메서드를 작성하기보다는 JWT 로 부터 claim 을 추출(파싱)하는 것으로 대신하는게 일반적인 개념.
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // Bearer부분 제거
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // 서버에 저장된 시크릿키를 Base64로 인코딩. JWT 서명을 검증하기 위한 Key이다.
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();   // Claims 파싱. JWT 토큰을 검증하고, 클레임 정보를 얻는다.

        // 클레임 정보 반환
        return claims;
    }

    // JWT로부터 추출한 클레임 정보를 이용해 인증 객체(Authentication)를 생성하고 SecurityContext에 저장하는 메소드
    // Authentication 객체에 파싱한 claims에서 email 정보를 얻는다.
    // Authentication 객체에 파싱한 claims에서 memberId 정보를 얻는다.
    private void setAuthenticationToContext(Map<String, Object> claims) {
//        String username = (String) claims.get("username");   // (4-1)
        String email = (String) claims.get("email"); // 수정된 부분
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));  // (4-2)
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);  // (4-3)

        // SecurityContextHolder에 생성한 인증 객체를 저장. 다른 부분에서 인증된 사용자의 정보 사용 가능!
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}

/*
=============================
# JWT 인가 개요 #

JWT의 구조는 header.payload.signature로 이루어져 있으며 Base64 URL 인코딩된 JSON 형태의 문자열이다.
이 토큰에는 Claim이라는 정보들이 들어있다. 하지만 클라이언트가 토큰을 생성할때 토큰 내용을 변조하여 사용자 권한을 조작할 수
있는 보안적 취약점이 존재하기 때문에 Claim 검증이 필요하다.

JWT 생성시 사용된 비밀키를 이용하여 JWT 내용을 암호화한 서명 값과,클라이언트가 전달한 JWT 내용의 서명 값을 비교하여 검증한다.
검증이 실패하면 해당 JWT는 무효화된다. 검증 결과가 올바르면 해당 JWT 내용에 대한 Claim 정보를 추출하여
다른 필터나 컨트롤러에서 사용할 수 있도록 제공한다.

payload에는 클레임(claims : 토큰에 포함된 정보)이 포함될 수 있다. 클레임은 JWT에 담긴 정보를 나타내는 Key-Value 쌍이다.
일반적으로, 클레임은 JWT를 발급한 서버에서 사용하는 정보, 예를 들어 사용자 ID, 권한, 만료 시간등을 담는다.

=============================

 */
