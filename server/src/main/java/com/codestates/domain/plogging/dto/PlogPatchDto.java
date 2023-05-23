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
    private long p_id;
    @NotBlank(message = "title not null")
    private String p_title;
    @NotBlank(message = "content not null")
    private String p_content;
}
