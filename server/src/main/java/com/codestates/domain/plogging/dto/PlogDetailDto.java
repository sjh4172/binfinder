package com.codestates.domain.plogging.dto;

import com.codestates.domain.plogging.comment.dto.PlogCommentResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PlogDetailDto {
    private Long plogId;
    private String title;
    private String content;
    private Long memberId;
    private String memberName;
    private Integer likes;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Integer plogCommentCount;
    private List<PlogCommentResponseDto> comments;
}
