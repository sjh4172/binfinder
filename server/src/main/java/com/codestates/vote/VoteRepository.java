package com.codestates.vote;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    List<Vote> findByMember_MemberId(Long memberId);
    List<Vote> findByTrashCanId(Long trashCanId);
}


