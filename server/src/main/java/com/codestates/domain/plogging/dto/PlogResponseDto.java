package com.codestates.domain.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlogResponseDto {
    private Long plogId;
    private String title;
    private String content;
    private String memberName;
    private Integer likeCount;
}
