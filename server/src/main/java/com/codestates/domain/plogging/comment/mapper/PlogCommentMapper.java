package com.codestates.domain.plogging.comment.mapper;

import com.codestates.domain.plogging.comment.dto.PlogCommentPatchDto;
import com.codestates.domain.plogging.comment.dto.PlogCommentPostDto;
import com.codestates.domain.plogging.comment.dto.PlogCommentResponseDto;
import com.codestates.domain.plogging.comment.entity.PlogComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlogCommentMapper {
    PlogComment plogCommentPostDtoToPlogComment(PlogCommentPostDto plogCommentPostDto);
    PlogComment plogCommentPatchDtoToPlogComment(PlogCommentPatchDto plogCommentPatchDto);
    PlogCommentResponseDto plogCommentToPlogResponseDto(PlogComment plogComment);


}
