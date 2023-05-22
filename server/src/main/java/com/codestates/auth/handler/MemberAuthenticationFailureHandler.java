package com.codestates.auth.handler;

import com.codestates.exception.ErrorResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 로그인 인증 실패 시 추가 처리를 할 수 있는 핸들러
@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        // 인증 실패 시, 에러 로그를 기록하거나 error response를 전송할 수 있다.
        log.error("# Authentication failed: {}", exception.getMessage());

        sendErrorResponse(response, exception);  // (2)
    }

    private void sendErrorResponse(HttpServletResponse response, AuthenticationException exception) throws IOException {

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        // 커스텀한 응답 데이터 생성
        JsonObject errorResponse = new JsonObject();

        // 비밀번호가 잘못된 경우
        if (exception instanceof BadCredentialsException) {
            errorResponse.addProperty("error", "Invalid credentials");
            errorResponse.addProperty("message", "Invalid username or password");
        }
        // 사용자가 존재하지 않는 겨우 처리(로그인 아이디가 잘못된 경우)
        else if (exception instanceof UsernameNotFoundException) {
            errorResponse.addProperty("error", "User not found");
            errorResponse.addProperty("message", "Invalid username or password");
        }

        // 등록되지 않은 아이디거나 아이디 또는 비밀번호를 잘못 입력했습니다.(둘 다 잘못 입력한 경우 or 아이디를 잘못 입력한 경우)
        else {
            errorResponse.addProperty("error", "Authentication failed");
            errorResponse.addProperty("message", "Your custom error message");
        }

        response.getWriter().write(errorResponse.toString());
    }
}
