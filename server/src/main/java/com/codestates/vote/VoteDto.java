package com.codestates.vote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class VoteDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class CreateRequest {
        private Long memberId;
        private Long trashCanId;
        private VoteType voteType;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private Long memberId;
        private Long trashCanId;
        private VoteType voteType;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    public enum VoteType {
        LIKE, DISLIKE
    }
}

