package com.codestates.domain.plogging.dto;

import com.codestates.domain.member.entity.Member;
import com.codestates.domain.plogging.comment.dto.PlogCommentResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlogDetailDto {
    private Long p_id;
    private String p_title;
    private String p_content;
    private Long memberId;
    private String username;
    private boolean checkParticipation;;
    private Integer likes;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Integer p_commentCount;
    private List<PlogCommentResponseDto> comments;
    public void setMember(Member member){this.memberId= member.getMemberId();}


}
