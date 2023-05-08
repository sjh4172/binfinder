package com.codestates.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
public class MemberPostDto {

    @NotBlank(message="email 입력은 필수입니다.")
    @Email
//    @Pattern(regexp ="/^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$/i",
//            message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    @NotBlank(message = "username 입력은 필수입니다.")
    private String username;

//    @Pattern(regexp ="^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$",
//            message = "영문, 특수문자, 숫자 포함 8자 이상")
    @NotBlank(message= "password 입력은 필수입니다.")
    private String password;

}
