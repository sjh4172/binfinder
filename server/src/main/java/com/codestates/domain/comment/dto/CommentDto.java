package com.codestates.domain.comment.dto;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {
	@Getter
	public static class Post {
		@NotBlank(message = "c_content not null")
		private String c_content;
		@Positive
		private long b_id;

		public Board getBoard(){
			Board board = new Board();
			board.setB_id(b_id);
			return board;
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Patch {
		private long c_id;
		@NotBlank(message = "c_content not null")
		private String c_content;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {
		private long c_id;
		private String c_content;
		private long memberId;
		private long b_id;
		private String username;
		private LocalDateTime createdAt;
		private LocalDateTime modifiedAt;


		public void setMember(Member member){this.memberId= member.getMemberId();}
		public void setBoard(Board board){this.b_id = board.getB_id();}
	}
}
