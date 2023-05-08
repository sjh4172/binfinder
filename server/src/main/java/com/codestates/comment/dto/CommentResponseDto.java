package com.codestates.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDto {
    private long memberId;
    private long plogId;
    private String comment;
    private String memberName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
