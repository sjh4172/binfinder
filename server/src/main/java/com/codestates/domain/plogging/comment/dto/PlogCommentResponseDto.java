package com.codestates.domain.plogging.comment.dto;

import com.codestates.domain.member.entity.Member;
import com.codestates.domain.plogging.entity.Plogging;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentResponseDto {
    private Long memberId;
    private Long plogCommentId;
    private String plogComment;
    private long p_id;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setMember(Member member){this.memberId = member.getMemberId(); }
    public void setPlogging(Plogging plogging){this.p_id=plogging.getP_id(); }
}
