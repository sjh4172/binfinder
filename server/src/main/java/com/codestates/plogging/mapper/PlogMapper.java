package com.codestates.plogging.mapper;

import com.codestates.plogging.dto.PlogDetailDto;
import com.codestates.plogging.dto.PlogPatchDto;
import com.codestates.plogging.dto.PlogPostDto;
import com.codestates.plogging.dto.PlogResponseDto;
import com.codestates.plogging.entity.Plogging;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlogMapper {

    Plogging plogPostDtoToPlogging(PlogPostDto plogPostDto);
    Plogging plogPatchDtoToPlogging(PlogPatchDto plogPatchDto);
    PlogPostDto ploggingToPlogPostDto(Plogging plogging);
    PlogPatchDto ploggingToPlogPatchDto(Plogging plogging);
    PlogResponseDto ploggingToPlogResponseDto(Plogging plogging);
    PlogDetailDto ploggingToPlogDetailDto(Plogging plogging);


}
//게시글 Mapper: 게시글 생성, 게시글 수정, 게시글 상세보기, 게시글 목록보기