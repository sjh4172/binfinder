package com.codestates.comment.service;

import com.codestates.board.entity.Board;
import com.codestates.board.service.BoardService;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.board.repository.BoardRepository;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
	private final CommentRepository commentRepository;
	private final BoardService boardService;
	private final MemberService memberService;

	public CommentService(CommentRepository commentRepository, BoardService boardService, MemberService memberService) {
		this.commentRepository = commentRepository;
		this.boardService = boardService;
		this.memberService = memberService;
	}

	public Comment createComment(Comment comment) {
		Board board= verifyExistingBoard(comment.getBoard());
		Member member = verifyExistingMember(comment.getMember());

		comment.setBoard(board);
		comment.setMember(member);

		board.addComments(comment);
		member.addComment(comment);

		return commentRepository.save(comment);
	}

	public Comment updateComment(Comment comment) {
		Comment findComment = findVerifiedComment(comment.getC_id());
		findComment.setC_content(comment.getC_content());

		return commentRepository.save(findComment);
	}

	public Comment findComment(long c_id) {
		Comment comment = commentRepository.findById(c_id)
				.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

		return comment;
	}

	public List<Comment> findComments() {
		return commentRepository.findAll();
	}

	public void deleteComment(long c_id) {
		Comment comment = commentRepository.findById(c_id)
				.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
		commentRepository.delete(comment);
	}

	public Comment findVerifiedComment(long c_id) {
		Optional<Comment> optionalBoard =
				commentRepository.findById(c_id);
		Comment findComment =
				optionalBoard.orElseThrow(() ->
						new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
		return findComment;
	}

	//존재하는 게시판인지 확인하는 함수
	private Board verifyExistingBoard(Board board){
		return boardService.findVerifiedBoard(board.getB_id());
	}
	//존재하는 회원인지 확인하는 함수
	private Member verifyExistingMember(Member member) {
		return memberService.findVerifiedMember(member.getMemberId());
	}

}
