package com.codestates.domain.vote;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.trashcan.TrashCan;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    List<Vote> findByMember_MemberId(Long memberId);
    List<Vote> findByTrashCanId(Long trashCanId);
    int countVotesByTrashCanAndVoteType(TrashCan trashCan, VoteDto.VoteTypeEnum voteType);
    List<Vote> findByMemberAndTrashCan(Member member, TrashCan trashCan);
}


