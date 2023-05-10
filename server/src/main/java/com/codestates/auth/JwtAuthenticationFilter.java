package com.codestates.auth;

import com.codestates.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

// 로그인 인증을 처리하는 필터.
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {  // 디폴트 Security Filter
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    // DI
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        // 로그인 인증 정보를 전달받아 UserDetailsService와 인터랙션 한 뒤 인증 여부를 판단한다.
        this.authenticationManager = authenticationManager;
        // 클라이언트가 인증에 성공할 경우 JWT를 생성 및 발급하는 역할을 한다.
        this.jwtTokenizer = jwtTokenizer;
    }

    // 로그인 인증을 실행하는 메서드이다.
    @SneakyThrows // request.getInputStream()을 호출하면 예외가 발생하는데 이 예외처리를 @SneakyThrows 로 처리 가능한 듯 하다.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();    // (3-1)
        // LoginDto 클래스의 객체로 역직렬화한다.
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        // Email과 Password 정보를 포함한 UsernamePasswordAuthenticationToken를 생성한다.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        // AuthenticationManager에게 전달하면서 인증 처리를 위임한다.
        return authenticationManager.authenticate(authenticationToken);  // (3-4)
    }

    // 클라이언트의 인증 정보를 이용해 인증에 성공할 경우 호출됩니다.
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        // Member 엔티티 클래스의 객체를 얻는다.
        // 인증에 성공하면 Authentication 객체가 생성되면서 principal 필드에 Member 객체가 할당됩니다.
        Member member = (Member) authResult.getPrincipal();  // (4-1)

        String accessToken = delegateAccessToken(member);   // 액세스 토큰 생성
        String refreshToken = delegateRefreshToken(member); // 리프레시 토큰 생성

        // response 헤더에 액세스 토큰을 추가한다.
        response.setHeader("Authorization", "Bearer "+accessToken);
        // response 헤더에 리프레시 토큰을 추가한다.
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);

    }

    // 액세스 토큰 생성 로직
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());
//        claims.put("Id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // 리프레시 토큰 생성 로직
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}

/*
=============================
# JWT 인증 개요 #

액세스 토큰
액세스 토큰은 클라이언트 측에서 백엔드 애플리케이션 측에 요청을 보낼 때마다 request header에 추가해서
클라이언트 측의 자격을 증명하는데 사용됩니다.

=============================

 */
