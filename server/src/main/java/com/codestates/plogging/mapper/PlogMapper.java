package com.codestates.plogging.mapper;

import com.codestates.plogging.dto.PlogPatchDto;
import com.codestates.plogging.dto.PlogPostDto;
import com.codestates.plogging.dto.PlogResponseDto;
import com.codestates.plogging.entity.Plogging;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlogMapper {

    Plogging plogPostDtoToPlogging(PlogPostDto plogPostDto);
    Plogging plogPatchDtoToPlogging(PlogPatchDto plogPatchDto);
    PlogPostDto ploggingToPlogPostDto(Plogging plogging);
    PlogPatchDto plpoggingToPlogPatchDto(Plogging plogging);
    List<PlogPostDto> ploggingListToPlogPostDto(List<Plogging> ploggingList);
    PlogResponseDto ploggingToPlogResponseDto(Plogging plogging);


}
//게시글 Mapper: 게시글 생성, 게시글 수정, 게시글 상세보기, 게시글 목록보기