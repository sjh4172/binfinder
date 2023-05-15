package com.codestates.auth.handler;

import com.codestates.exception.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
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

        sendErrorResponse(response);  // (2)
    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException {
        Gson gson = new Gson();     // (2-1)
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED); // (2-2)
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);    // (2-3)
        response.setStatus(HttpStatus.UNAUTHORIZED.value());          // (2-4)
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));   // (2-5)
    }
}
