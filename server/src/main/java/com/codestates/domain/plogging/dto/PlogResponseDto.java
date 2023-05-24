package com.codestates.domain.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import com.codestates.domain.member.entity.Member;

@Getter
@Setter
@NoArgsConstructor
public class PlogResponseDto {
    private Long p_id;
    private String p_title;
    private String p_content;
    private String username;
    private long memberId;
    private Integer likes;
    private Integer p_commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private boolean checkParticipation; // 참가 유무

    public void setMember(Member member){ this.memberId = member.getMemberId();}
}
