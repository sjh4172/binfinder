package com.codestates.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentPatchDto {
    @NotNull
    private long plogId;
    private String comment;
}
