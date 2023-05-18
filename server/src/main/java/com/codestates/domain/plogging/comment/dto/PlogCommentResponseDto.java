package com.codestates.domain.plogging.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentResponseDto {
    private long memberId;
    private String plogComment;
    private String memberName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
