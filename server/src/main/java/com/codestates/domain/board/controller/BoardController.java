package com.codestates.domain.board.controller;

import com.codestates.domain.board.dto.BoardDto;
import com.codestates.domain.board.entity.Board;
import com.codestates.domain.board.mapper.BoardMapper;
import com.codestates.domain.board.service.BoardService;
import com.codestates.domain.comment.dto.CommentDto;
import com.codestates.domain.comment.service.CommentService;
import com.codestates.domain.plogging.dto.PlogDetailDto;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.data.domain.Pageable;
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
	private CommentService commentService;

	public BoardController(BoardService boardService, BoardMapper mapper, CommentService commentService) {
		this.boardService = boardService;
		this.mapper = mapper;
		this.commentService = commentService;
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
	public ResponseEntity getBoards(
					@RequestParam(defaultValue = "0") int page,
					@RequestParam(defaultValue = "20") int size
	) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Board> boardPage = boardService.findBoards(pageable);

		List<BoardDto.Response> response = boardPage
						.stream()
						.map(board -> mapper.boardToBoardResponseDto(board))
						.collect(Collectors.toList());

		//나연: 전체 페이지수 추가 요청에 따라 추가했습니다.기존 리턴문 주석처리, 헤더로 전체페이지수 반환, 디폴트사이즈도 20으로 바꿨습니다
		HttpHeaders headers = new HttpHeaders();
		headers.add("X-Total-Pages", String.valueOf(boardService.getTotalPages(size)));
		return ResponseEntity.ok()
				.headers(headers)
				.body(response);


		//return new ResponseEntity<>(response, HttpStatus.OK);
	}

//	@GetMapping("/{id}")
//	public ResponseEntity getBoard(@PathVariable("id") long id) {
//		Board response = boardService.findBoard(id);
//		//댓글 가져오기
//		List<CommentDto> commentDtoList = commentService.findAll(id);
//		return new ResponseEntity<>(mapper.boardToBoardResponseDto(response) ,HttpStatus.OK);
//	}

	@GetMapping("/{b_id}")
	public ResponseEntity findBoard(@PathVariable("b_id") Long id) {
		Board board = boardService.findBoardWithComment(id);
		if (board == null) {
			return ResponseEntity.notFound().build();
		}
		BoardDto.Detail Details = mapper.BoardToDetailDto(board);
		return ResponseEntity.ok(Details);
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
