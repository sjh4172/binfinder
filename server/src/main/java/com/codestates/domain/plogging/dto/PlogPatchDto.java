package com.codestates.domain.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class PlogPatchDto {
    @Positive
    private long plogId;
    @NotBlank(message = "title not null")
    private String title;
    @NotBlank(message = "content not null")
    private String content;
}
