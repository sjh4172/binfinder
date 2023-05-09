package com.codestates.board.controller;

import com.codestates.board.dto.BoardDto;
import com.codestates.board.entity.Board;
import com.codestates.board.mapper.BoardMapper;
import com.codestates.board.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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
	public ResponseEntity postBoard (@RequestBody BoardDto.Post postDto) {

		// uri 리턴 방식으로 변경
		Board board = boardService.createBoard(mapper.boardPostDtoToBoard(postDto));

		URI uri = UriComponentsBuilder.newInstance()
				.path("/api/boards/"+board.getB_id())
				.build().toUri();

		return ResponseEntity.created(uri).build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity patchBoard(@PathVariable("id") long id, @RequestBody BoardDto.Patch patchDto) {
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
}
