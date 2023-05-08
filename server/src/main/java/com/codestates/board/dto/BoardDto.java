package com.codestates.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class BoardDto {
	@Getter
	@Setter
	@AllArgsConstructor
	public static class Post {
		private String b_title;
		private String b_content;
		private boolean b_good;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Patch {
		private long b_id;
		private String b_title;
		private String b_content;
		private boolean b_good;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {
		private long b_id;
		private String b_title;
		private String b_content;
		private boolean b_good;
	}
}
