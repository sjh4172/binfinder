package com.codestates.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentPostDto {
    @NotNull
    private long memberId;
    @NotNull
    private long plogId;
    @NotBlank(message = "댓글 내용이 없습니다.")
    private String comment;

}
