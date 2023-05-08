package com.codestates.comment.mapper;

import com.codestates.comment.dto.CommentPatchDto;
import com.codestates.comment.dto.CommentPostDto;
import com.codestates.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);
    CommentPostDto commentToCommentPostDto(Comment comment);
    CommentPatchDto commentToCommentPatchDto(Comment comment);
    List<CommentPostDto> commentListToCommentPostDto(List<Comment> commentList);


}
