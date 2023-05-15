package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberPatchDto {
    private long memberId;
    private String username;
    private String password;
    private Member.MemberStatus memberStatus;

    public void setMemberId(long memberId){
        this.memberId = memberId;
    }
}
