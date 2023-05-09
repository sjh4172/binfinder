package com.codestates.board.service;

import com.codestates.board.entity.Board;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.board.repository.BoardRepository;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
	private final BoardRepository boardRepository;
	private final MemberService memberService;

	public BoardService(BoardRepository boardRepository, MemberService memberService) {
		this.boardRepository = boardRepository;
		this.memberService = memberService;
	}

	public Board createBoard(Board board) {
		Member member = verifyExistingMember(board.getMember());
		board.setMember(member);
		member.setBoard(board);
		return boardRepository.save(board);
	}

	public Board updateBoard(Board board) {
		Board findBoard = findVerifiedBoard(board.getB_id());
		findBoard.setB_title(board.getB_title());
		findBoard.setB_content(board.getB_content());
		findBoard.setB_good(board.isB_good());

		return boardRepository.save(findBoard);
	}

	public Board findBoard(long b_id) {
		Board board = boardRepository.findById(b_id)
						.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

		return board;
	}

	public List<Board> findBoards() {
		return boardRepository.findAll();
	}

	public void deleteBoard(long b_id) {
		Board board	= boardRepository.findById(b_id)
						.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
		boardRepository.delete(board);
	}

	public Board findVerifiedBoard(long b_id) {
		Optional<Board> optionalBoard =
						boardRepository.findById(b_id);
		Board findBoard =
						optionalBoard.orElseThrow(() ->
										new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
		return findBoard;
	}
	private Member verifyExistingMember(Member member){
		return memberService.findVerifiedMember(member.getMemberId());
	}

}
