package com.codestates.comment.dto;

import com.codestates.board.entity.Board;
import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class CommentDto {
	@Getter
	public static class Post {
		private String c_content;
		private long memberId;
		private long b_id;
		public Board getBoard(){
			Board board = new Board();
			board.setB_id(b_id);

			return board;
		}

		public Member getMember() {
			Member member = new Member();
			member.setMemberId(memberId);

			return member;
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Patch {
		private long c_id;
		private String c_content;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {
		private long c_id;
		private String c_content;
		private String username;
	}
}
