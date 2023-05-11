package com. codestates.plogging.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentPostDto {
    @NotNull
    private long memberId;
    @NotNull
    private long plogCommentId;
    @NotBlank(message = "댓글 내용이 없습니다.")
    private String plogComment;

}
