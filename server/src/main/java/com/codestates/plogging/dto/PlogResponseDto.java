package com.codestates.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PlogResponseDto {
    private Long plogId;
    private String title;
    private String content;
    private Long memberId;
    private String mamberName;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    //private List<CommentDto.Response> comments;
}
