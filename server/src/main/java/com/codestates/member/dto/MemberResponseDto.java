package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class MemberResponseDto {
    private long memberId;
    private String email;
    private String username;
    private String password;
    private Member.MemberStatus memberStatus;

}
