package com.codestates.domain.plogging.mapper;

import com.codestates.domain.plogging.dto.PlogDetailDto;
import com.codestates.domain.plogging.dto.PlogPatchDto;
import com.codestates.domain.plogging.dto.PlogPostDto;
import com.codestates.domain.plogging.dto.PlogResponseDto;
import com.codestates.domain.plogging.entity.Plogging;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlogMapper {

    Plogging plogPostDtoToPlogging(PlogPostDto plogPostDto);
//    @Mapping(target = "p_id", source = "plogPatchDto.p_id")
//    @Mapping(target = "member", ignore = true)
    Plogging plogPatchDtoToPlogging(PlogPatchDto plogPatchDto);
    PlogResponseDto ploggingToPlogResponseDto(Plogging plogging);
    PlogDetailDto ploggingToPlogDetailDto(Plogging plogging);


}
//게시글 Mapper: 게시글 생성, 게시글 수정, 게시글 상세보기, 게시글 목록보기