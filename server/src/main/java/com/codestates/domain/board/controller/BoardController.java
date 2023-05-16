package com.codestates.domain.board.controller;

import com.codestates.domain.board.dto.BoardDto;
import com.codestates.domain.board.entity.Board;
import com.codestates.domain.board.mapper.BoardMapper;
import com.codestates.domain.board.service.BoardService;
import com.codestates.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/api/boards")
@CrossOrigin(origins = "*")
public class BoardController {
	private BoardService boardService;
	private BoardMapper mapper;

	public BoardController(BoardService boardService, BoardMapper mapper) {
		this.boardService = boardService;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity postBoard (@Valid @RequestBody BoardDto.Post postDto) {

		// uri 리턴 방식으로 변경
		Board board = boardService.createBoard(mapper.boardPostDtoToBoard(postDto));

		URI uri = UriComponentsBuilder.newInstance()
				.path("/api/boards/"+board.getB_id())
				.build().toUri();

		return ResponseEntity.created(uri).build();

//		Board board = mapper.boardPostDtoToBoard(postDto);
//		Board response = boardService.createBoard(board);
//
//		return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.CREATED);
	}

	@PatchMapping("/{id}")
	public ResponseEntity patchBoard(@PathVariable("id") long id, @Valid @RequestBody BoardDto.Patch patchDto) {
		patchDto.setB_id(id);
		Board board = mapper.boardPatchDtoToBoard(patchDto);
		Board response = boardService.updateBoard(board);

		return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity getBoards() {
		List<Board> boards = boardService.findBoards();

		List<BoardDto.Response> response =
						boards.stream()
										.map(board -> mapper.boardToBoardResponseDto(board))
										.collect(Collectors.toList());

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity getBoard(@PathVariable("id") long id) {
		Board response = boardService.findBoard(id);

		return new ResponseEntity<>(mapper.boardToBoardResponseDto(response) ,HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteBoard(@PathVariable("id") long id) {
		boardService.deleteBoard(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/like/{b_id}/{m_id}")
	public ResponseEntity postLike(@PathVariable("b_id") long b_id, @PathVariable("m_id") long m_id) {
		Board response = boardService.addLike(b_id, m_id);

		return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
	}
	@PostMapping("/unlike/{b_id}/{m_id}")
	public ResponseEntity deleteLike(@PathVariable("b_id") long b_id, @PathVariable("m_id") long m_id) {
		Board response = boardService.removeLike(b_id, m_id);

		return new ResponseEntity<>(mapper.boardToBoardResponseDto(response), HttpStatus.OK);
	}
	@ExceptionHandler
	public ResponseEntity handleException(MethodArgumentNotValidException e) {
		// (1)
		final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

		// (2)
		List<ErrorResponse.FieldError> errors =
						fieldErrors.stream()
										.map(error -> new ErrorResponse.FieldError(
														error.getField(),
														error.getRejectedValue(),
														error.getDefaultMessage()))
										.collect(Collectors.toList());

//		return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
			return ResponseEntity.badRequest().body(ErrorResponse.of(e.getBindingResult()));
	}
}
