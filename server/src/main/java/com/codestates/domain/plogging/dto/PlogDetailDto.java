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
    private Long p_id;
    private String p_title;
    private String p_content;
    private Long memberId;
    private String userName;
    private boolean checkLike;
    private Integer likes;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Integer p_commentCount;
    private List<PlogCommentResponseDto> comments;
}
