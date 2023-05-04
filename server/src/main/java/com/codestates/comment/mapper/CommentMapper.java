package com.codestates.comment.mapper;

import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
	Comment commentPostDtoToComment(CommentDto.Post postDto);
	Comment commentPatchDtoToComment(CommentDto.Patch patchDto);
	CommentDto.Response commentToCommentResponseDto(Comment comment);
}
