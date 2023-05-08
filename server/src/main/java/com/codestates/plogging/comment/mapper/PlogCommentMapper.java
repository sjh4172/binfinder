package com. codestates.plogging.comment.mapper;

import com.codestates.plogging.comment.dto.PlogCommentPatchDto;
import com.codestates.plogging.comment.dto.PlogCommentPostDto;
import com.codestates.plogging.comment.entity.PlogComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlogCommentMapper {
    PlogComment commentPostDtoToComment(PlogCommentPostDto plogCommentPostDto);
    PlogComment commentPatchDtoToComment(PlogCommentPatchDto plogCommentPatchDto);
    PlogCommentPostDto commentToCommentPostDto(PlogComment plogComment);
    PlogCommentPatchDto commentToCommentPatchDto(PlogComment plogComment);
    List<PlogCommentPostDto> commentListToCommentPostDto(List<PlogComment> plogComments);


}
