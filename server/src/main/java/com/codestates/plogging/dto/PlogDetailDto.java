package com.codestates.plogging.dto;

import com.codestates.plogging.comment.dto.PlogCommentResponseDto;
import com.codestates.plogging.comment.entity.PlogComment;
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
    private List<PlogCommentResponseDto> comments;
}
