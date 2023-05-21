package com.codestates.config;

import com.codestates.auth.CustomAuthorityUtils;
import com.codestates.auth.JwtAuthenticationFilter;
import com.codestates.auth.JwtTokenizer;
import com.codestates.auth.JwtVerificationFilter;
import com.codestates.auth.handler.MemberAccessDeniedHandler;
import com.codestates.auth.handler.MemberAuthenticationEntryPoint;
import com.codestates.auth.handler.MemberAuthenticationFailureHandler;
import com.codestates.auth.handler.MemberAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

/*
### 스프링 시큐리티 설정을 위한 클래스 ###

- 로그인 인증 추가
- 로그인 인증 성공, 실패 핸들러 추가
- 세션 정책 설정 추가
- JwtVerificationFilter 추가
- Exception 발생시 처리하는 핸들러 추가
- OAuth 2 인증 설정

*/
@Configuration
@EnableWebSecurity
public class SecurityConfiguration{
    @Value("${spring.security.oauth2.client.registration.google.clientId}")  // application.yml
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}") // application.yml
    private String clientSecret;
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable() //CSRF 공격에 대한 설정 비활성화
                .cors(withDefaults()) //CORS 설정 추가
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 생성 x
                .and()
                .formLogin().disable() //CSR 방식 로그인을 위한 폼 로그인 비활성화
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // (1) 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // (2) 추가
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN") // 전체 회원 정보 조회는 관리자만 가능.
                        .antMatchers(HttpMethod.GET, "/members/").hasRole("ADMIN") // 전체 회원 정보 조회는 관리자만 가능.
                        .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("ADMIN","USER")
                        .antMatchers(HttpMethod.POST, "/members").permitAll() // 회원가입을 로그인 없이도 가능.
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER") // 특정 회원 정보 수정은 회원 본인만 가능.
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER") // 특정 회원 정보 삭제는 회원 본인만 가능.

                        .antMatchers(HttpMethod.GET, "/boards").permitAll() //전체 게시판 조회는 로그인 없이도 가능
                        .antMatchers(HttpMethod.GET, "/boards/**").hasAnyRole("ADMIN", "USER") // 특정 게시판 조회는 관리자, 회원만 가능
                        .antMatchers(HttpMethod.POST, "/boards").hasAnyRole("USER") // 게시판 글 작성은 회원만 가능
                        .antMatchers(HttpMethod.PATCH, "/boards/**").hasAnyRole("ADMIN","USER") // 불량 게시판 글일 경우 관리자가 수정, 회원 본인 글 수정
                        .antMatchers(HttpMethod.DELETE, "/boards/**").hasAnyRole("ADMIN","USER") // 불량 게시판 글일 경우 관리자가 삭제, 회원 본인 글 삭제

                        .antMatchers(HttpMethod.GET, "/comments").hasAnyRole("ADMIN","USER") // 전체 댓글 조회는 관리자와 회원만 가능
                        .antMatchers(HttpMethod.GET, "/comments/").hasAnyRole("ADMIN","USER") // 전체 댓글 조회는 관리자와 회원만 가능
                        .antMatchers(HttpMethod.GET, "/comments/**").hasAnyRole("ADMIN", "USER")
                        .antMatchers(HttpMethod.POST, "/comments").hasRole("USER") // 댓글 작성은 회원만 가능
                        .antMatchers(HttpMethod.PATCH, "/comments/**").hasAnyRole("ADMIN","USER") // 불량 댓글일 경우 관리자가 수정, 회원 댓글 수정
                        .antMatchers(HttpMethod.DELETE, "/comments/**").hasAnyRole("ADMIN","USER") // 불량 게시판 댓글일 경우 관리자가 삭제, 회원 댓글 삭제

                        .antMatchers(HttpMethod.GET,"/trash-cans/**").hasAnyRole("ADMIN","USER")
                        .antMatchers(HttpMethod.GET,"/vote/members/**").hasAnyRole("ADMIN","USER")
                        .antMatchers(HttpMethod.POST,"/vote").hasRole("USER") // 쓰레기통 좋아요, 싫어요 투표는 유저만 가능
                        .antMatchers(HttpMethod.PUT,"/vote/**").hasRole("USER") // 투표 수정은 유저만 가능
                        .antMatchers(HttpMethod.DELETE,"/vote/**").hasAnyRole("ADMIN","USER") // 투표 삭제는 관리자, 유저만 가능

                        .anyRequest().permitAll()); // 서버 측으로 들어오는 모든 request 접근 허용

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CORS 정책 설정


//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
//        configuration.setAllowedMethods(Arrays.asList(""));
//        configuration.addAllowedHeader("");
//        configuration.addExposedHeader("Authorization"); //
//        configuration.addExposedHeader("Refresh");
//        configuration.addExposedHeader("memberId");
//        configuration.setAllowCredentials(false);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//        return source;
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "PUT"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Authorization", "Refresh")); // 허용된 도메인에 대해 노출시킬 헤더 설정

        //UrlBasedCorsConfigurationSource 는 CorsConfigurationSource 인터페이스를 구현한 클래스이다.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
    }


    // 구현한 JwtAuthenticationFilter를 등록하는 역할
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");          // (2-5)
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // (3) 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // (4) 추가

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);  // JwtVerificationFilter에서 사용되는 객체들을 생성자로 DI

            // JwtAuthenticationFilter는 로그인 시 사용자의 정보를 확인
            // JwtVerificationFilter는 API 요청 시 전달된 JWT 토큰의 유효성을 검사
            // 아래의 코드는 JwtAuthenticationFilter의 작업이 완료된 이후에 JwtVerificationFilter가 실행되도록 필터 체인
            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}

