package com.codestates.domain.member.dto;

import com.codestates.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class MemberPatchDto {

    // 회원 정보 수정에 필요한 DTO
    // 아이디로 쓰이는 이메일은 바꿀 수 없다.

    private long memberId;
    @NotBlank(message= "username not null")
    private String username; //닉네임
    @NotBlank(message= "password not null")
    private String password;
    private Member.MemberStatus memberStatus;

    public void setMemberId(long memberId){
        this.memberId = memberId;
    }
}
