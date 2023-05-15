package com.codestates.domain.plogging.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.prefs.BackingStoreException;

@Getter
@Setter
@NoArgsConstructor
public class PlogPostDto {
    private Long plogId;
    @NotBlank(message = "제목을 써주세요.")
    private String title;
    @NotBlank(message = "게시글의 내용이 없습니다.")
    private String content;

}
