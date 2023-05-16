package com.codestates.domain.vote;

import com.codestates.domain.member.entity.Member;
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
        private VoteTypeEnum voteType;
        public void setMember(Member member){this.memberId= member.getMemberId();}
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private Long memberId;
        private Long trashCanId;
        private VoteTypeEnum voteType;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public void setMember(Member member){this.memberId= member.getMemberId();}


    }

    public enum VoteTypeEnum {
        LIKE, DISLIKE
    }
}

