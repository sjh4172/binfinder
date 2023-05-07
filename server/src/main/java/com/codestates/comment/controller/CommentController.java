package com.codestates.comment.controller;

import com.codestates.board.dto.BoardDto;
import com.codestates.board.entity.Board;
import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.comment.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comment")
public class CommentController {
	private CommentMapper mapper;
	private CommentService commentService;

	@Autowired
	public CommentController(CommentMapper mapper,
													 CommentService commentService) {
		this.mapper = mapper;
		this.commentService = commentService;
	}

	@PostMapping
	public ResponseEntity postComment(@RequestBody CommentDto.Post postDto) {
		Comment comment = mapper.commentPostDtoToComment(postDto);
		Comment response = commentService.createComment(comment);

		return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.CREATED);
	}

	@PatchMapping("/{id}")
	public ResponseEntity patchComment(@RequestBody CommentDto.Patch requestBody,
																		 @PathVariable("id") long id) {
		requestBody.setC_id(id);
		Comment comment = mapper.commentPatchDtoToComment(requestBody);
		Comment response = commentService.updateComment(comment);

		return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity getComments() {
		List<Comment> comments = commentService.findComments();

		List<CommentDto.Response> responses =
						comments.stream()
										.map(comment -> mapper.commentToCommentResponseDto(comment))
										.collect(Collectors.toList());

		return new ResponseEntity<>(responses, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteComment(@PathVariable("id") long id) {
		commentService.deleteComment(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
