package com.codestates.vote;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.codestates.trashcan.TrashCan;
import com.codestates.trashcan.TrashCanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {
    private final VoteRepository voteRepository;
    private final MemberRepository memberRepository;
    private final TrashCanRepository trashCanRepository;
    private final VoteMapper voteMapper;

    public VoteService(VoteRepository voteRepository, MemberRepository memberRepository, TrashCanRepository trashCanRepository, VoteMapper voteMapper) {
        this.voteRepository = voteRepository;
        this.memberRepository = memberRepository;
        this.trashCanRepository = trashCanRepository;
        this.voteMapper = voteMapper;
    }

    public VoteDto.Response createVote(VoteDto.CreateRequest createRequest) {
        Member member = memberRepository.findById(createRequest.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        TrashCan trashCan = trashCanRepository.findById(createRequest.getTrashCanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRASH_CAN_NOT_FOUND));

        Boolean isLiked = createRequest.getVoteType() == VoteDto.VoteType.LIKE;

        Vote vote = new Vote();
        vote.setMember(member);
        vote.setTrashCan(trashCan);
        vote.setIsLiked(isLiked);
        vote = voteRepository.save(vote);

        VoteDto.Response response = voteMapper.voteToResponseDto(vote);
        return response;
    }

    public VoteDto.Response updateVote(VoteDto.CreateRequest createRequest) {
        Member member = memberRepository.findById(createRequest.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        TrashCan trashCan = trashCanRepository.findById(createRequest.getTrashCanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRASH_CAN_NOT_FOUND));

        Boolean isLiked = createRequest.getVoteType() == VoteDto.VoteType.LIKE;

        Vote vote = new Vote();
        vote.setMember(member);
        vote.setTrashCan(trashCan);
        vote.setIsLiked(isLiked);
        vote = voteRepository.save(vote);

        VoteDto.Response response = voteMapper.voteToResponseDto(vote);
        return response;
    }

    public void deleteVote(Long voteId)  {
        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));

        voteRepository.delete(vote);
    }

    public List<VoteDto.Response> getVotesByMember(Long memberId) {
        List<Vote> votes = voteRepository.findByMember_MemberId(memberId);

        return voteMapper.voteListToResponseDtoList(votes);
    }

    public List<VoteDto.Response> getVotesByTrashCan(Long trashCanId) {
        List<Vote> votes = voteRepository.findByTrashCanId(trashCanId);

        return voteMapper.voteListToResponseDtoList(votes);
    }
}