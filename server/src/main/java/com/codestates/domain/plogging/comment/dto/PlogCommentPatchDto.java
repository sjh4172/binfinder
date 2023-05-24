package com.codestates.domain.plogging.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentPatchDto {
    private Long plogCommentId;
    private String plogComment;
}
