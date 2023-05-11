package com.codestates.plogging.mapper;

import com.codestates.plogging.dto.PlogDetailDto;
import com.codestates.plogging.dto.PlogPatchDto;
import com.codestates.plogging.dto.PlogPostDto;
import com.codestates.plogging.dto.PlogResponseDto;
import com.codestates.plogging.entity.Plogging;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlogMapper {

    Plogging plogPostDtoToPlogging(PlogPostDto plogPostDto);
//    @Mapping(target = "plogId", source = "plogPatchDto.plogId")
//    @Mapping(target = "member", ignore = true)
    Plogging plogPatchDtoToPlogging(PlogPatchDto plogPatchDto);
    PlogResponseDto ploggingToPlogResponseDto(Plogging plogging);
    PlogDetailDto ploggingToPlogDetailDto(Plogging plogging);


}
//게시글 Mapper: 게시글 생성, 게시글 수정, 게시글 상세보기, 게시글 목록보기