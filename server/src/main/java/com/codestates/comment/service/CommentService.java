package com.codestates.comment.service;

import com.codestates.board.entity.Board;
import com.codestates.comment.entity.Comment;
import com.codestates.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.board.repository.BoardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
	private final CommentRepository commentRepository;

	public CommentService(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}
	public Comment createComment(Comment comment) {

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
		Comment comment	= commentRepository.findById(c_id)
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

}
