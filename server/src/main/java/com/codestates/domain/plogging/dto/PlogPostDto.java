package com.codestates.domain.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.prefs.BackingStoreException;

@Getter
@Setter
@NoArgsConstructor
public class PlogPostDto {
    @Positive
    private Long plogId;
    @NotBlank(message = "title not null")
    private String title;
    @NotBlank(message = "content not null")
    private String content;

}
