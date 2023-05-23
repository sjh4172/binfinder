package com.codestates.domain.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlogResponseDto {
    private Long p_id;
    private String p_title;
    private String p_content;
    private String userName;
    private Integer likes;
    private Integer p_commentCount;
}
