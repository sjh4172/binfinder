package com.codestates.domain.plogging.comment.dto;

import com.codestates.domain.plogging.entity.Plogging;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class PlogCommentPostDto {
    @NotNull
    private Long p_id;
    private String plogComment;

    public Plogging getPlogging(){
        Plogging plogging = new Plogging();
        plogging.setP_id(p_id);
        return plogging;
    }

}
