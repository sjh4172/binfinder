package com.codestates.domain.plogging.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentPostDto {
    private long memberId;
    private long plogCommentId;
    private String plogComment;

}
