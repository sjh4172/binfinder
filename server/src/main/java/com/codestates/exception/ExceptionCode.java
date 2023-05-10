package com.codestates.exception;

import lombok.Getter;
public enum ExceptionCode {
	BOARD_NOT_FOUND(404,"Board not found"),
	COMMENT_NOT_FOUND(404, "Comment not found"),
  	MEMBER_NOT_FOUND(404, "Member not found"),
	MEMBER_EXISTS(409, "Member exists"),
	MEMBER_NOT_VALID(403,"Member not valid"),
	MEMBER_UNAUTHORIZED(401, "Member Unauthorized"),
	TRASH_CAN_NOT_FOUND(404, "Trash can not found"),
	VOTE_NOT_FOUND(404, "Vote not found");

	@Getter
	private int status;
	@Getter
	private String message;

	ExceptionCode(int code, String message) {
		this.status = code;
		this.message = message;
	}
}
