package com. codestates.plogging.comment.mapper;

import com.codestates.plogging.comment.dto.PlogCommentPatchDto;
import com.codestates.plogging.comment.dto.PlogCommentPostDto;
import com.codestates.plogging.comment.dto.PlogCommentResponseDto;
import com.codestates.plogging.comment.entity.PlogComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlogCommentMapper {
    PlogComment plogCommentPostDtoToPlogComment(PlogCommentPostDto plogCommentPostDto);
    PlogComment plogCommentPatchDtoToPlogComment(PlogCommentPatchDto plogCommentPatchDto);
    PlogCommentResponseDto plogCommentToPlogResponseDto(PlogComment plogComment);


}
