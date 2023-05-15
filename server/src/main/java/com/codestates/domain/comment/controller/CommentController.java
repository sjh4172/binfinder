package com.codestates.domain.comment.controller;

import com.codestates.domain.comment.dto.CommentDto;
import com.codestates.domain.comment.entity.Comment;
import com.codestates.domain.comment.mapper.CommentMapper;
import com.codestates.domain.comment.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
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

		//uri 리턴 방식으로 변경
		Comment comment = commentService.createComment(mapper.commentPostDtoToComment(postDto));

		URI uri = UriComponentsBuilder.newInstance()
				.path("/api/comments/"+ comment.getC_id())
				.build().toUri();

		return ResponseEntity.created(uri).build();
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
