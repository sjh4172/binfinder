package com.codestates.config;

import com.codestates.auth.CustomAuthorityUtils;
import com.codestates.auth.JwtAuthenticationFilter;
import com.codestates.auth.JwtTokenizer;
import com.codestates.auth.JwtVerificationFilter;
import com.codestates.auth.handler.MemberAuthenticationFailureHandler;
import com.codestates.auth.handler.MemberAuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

// 보안 설정
@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration{
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
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable() //CSR 방식 로그인을 위한 폼 로그인 비활성화
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members").permitAll() // 회원가입을 로그인 없이도 가능.
                        .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN") // 전체 회원 정보 조회는 관리자만 가능.
                        .antMatchers(HttpMethod.GET, "/members/").hasRole("ADMIN") // 전체 회원 정보 조회는 관리자만 가능.
                        .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("ADMIN","USER")
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER") // 특정 회원 정보 수정은 회원 본인만 가능.
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER") // 특정 회원 정보 삭제는 회원 본인만 가능.

                        .anyRequest().permitAll());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CORS 정책 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));  // (8-2)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();   // (8-3)
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    // (2)
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");          // (2-5)
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // (3) 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // (4) 추가

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);  // (2) 추가

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);   // (3)추가
        }
    }
}

