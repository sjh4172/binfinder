package com.codestates.board.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class BoardDto {
	@Getter
	@Setter
	@AllArgsConstructor
	public static class Post {
		@NotBlank(message = "제목은 공백이 아니어야 합니다.")
		private String b_title;
		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String b_content;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Patch {
		private long b_id;
		@NotBlank(message = "제목은 공백이 아니어야 합니다.")
		private String b_title;
		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String b_content;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {
		private long b_id;
		private String b_title;
		private String b_content;
		private long likes;
		private long m_id;
	}
}
