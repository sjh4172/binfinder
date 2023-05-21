package com.codestates.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

// Error 정보만 담아서 응답으로 전송하기 위한 클래스
@Getter
@AllArgsConstructor
public class ErrorResponse {

    List<FieldError> fieldErrors;
    List<ConstraintViolationError> violationErrors;
    private String reason;

    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors) {
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    private ErrorResponse(String reason) {
        this.reason = reason;
    }
    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(FieldError.of(bindingResult), null);}
    public static ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations) {
        return new ErrorResponse(null, ConstraintViolationError.of(constraintViolations));}

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getMessage());
    }
    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.getReasonPhrase());
    }
    public static ErrorResponse of(String message) {
        return new ErrorResponse(message);
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;


        public static FieldError of(String field, Object rejectedValue, String reason) {
            return new FieldError(field, rejectedValue, reason);
        }

        public static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> FieldError.of(error.getField(), error.getRejectedValue(), error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(), constraintViolation.getInvalidValue(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }


    }
}
