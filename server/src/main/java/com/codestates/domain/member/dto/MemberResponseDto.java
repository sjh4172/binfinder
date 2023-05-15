package com.codestates.domain.member.dto;

import com.codestates.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberResponseDto {
    private long memberId;
    private String email;
    private String username;
    private String password;
    private Member.MemberStatus memberStatus;

}
