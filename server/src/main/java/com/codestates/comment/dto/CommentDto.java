package com.codestates.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class CommentDto {
	@Getter
	public static class Post {
		private String c_content;
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
	}
}
