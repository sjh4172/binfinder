package com.codestates.domain.vote;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.service.MemberService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.repository.MemberRepository;
import com.codestates.domain.trashcan.TrashCan;
import com.codestates.domain.trashcan.TrashCanRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;


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

    // 쿼리문 사용 위함
    @PersistenceContext
    private EntityManager entityManager;

    // 좋아요/싫어요 투표하기
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public VoteDto.Response createOrUpdateVote(VoteDto.CreateRequest createRequest) {
        // 사용자 인증
        verifyAuthorizedMember();
        Member member = verifyExistingMember(getAuthentication().getName());

        // 쓰레기통 정보 조회
        TrashCan trashCan = trashCanRepository.findById(createRequest.getTrashCanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRASH_CAN_NOT_FOUND));

        VoteDto.VoteTypeEnum voteTypeEnum = createRequest.getVoteType();

        // 기존 투표 조회
        List<Vote> existingVotes = voteRepository.findByMemberAndTrashCan(member, trashCan);

        if (existingVotes.isEmpty()) {
            // 새로운 투표 생성
            Vote vote = new Vote();
            vote.setMember(member);
            vote.setTrashCan(trashCan);
            vote.setVoteType(voteTypeEnum);
            vote = voteRepository.save(vote);

            // 투표 타입에 따라 카운트 증가
            if (voteTypeEnum == VoteDto.VoteTypeEnum.LIKE) {
                increaseLikeCount(trashCan);
            } else if (voteTypeEnum == VoteDto.VoteTypeEnum.DISLIKE) {
                increaseDislikeCount(trashCan);
            }

            VoteDto.Response response = voteMapper.voteToResponseDto(vote);
            return response;
        } else {
            // 기존 투표 수정
            Vote existingVote = existingVotes.get(0); // 첫 번째 투표를 가져옴
            VoteDto.VoteTypeEnum existingVoteType = existingVote.getVoteType();

            // 이미 같은 유형의 투표를 한 경우, 투표를 삭제하고 투표 개수 감소
            if (existingVoteType == voteTypeEnum) {
                deleteVote(existingVote);
                decreaseVoteCount(trashCan, existingVoteType);
                return null; // 투표 취소된 경우 응답 없음
            } else {
                // 다른 유형으로 투표 수정
                deleteVote(existingVote);
                decreaseVoteCount(trashCan, existingVoteType);
                increaseVoteCount(trashCan, voteTypeEnum);

                // 수정된 투표 정보 저장
                Vote newVote = new Vote();
                newVote.setMember(member);
                newVote.setTrashCan(trashCan);
                newVote.setVoteType(voteTypeEnum);
                newVote = voteRepository.save(newVote);

                VoteDto.Response response = voteMapper.voteToResponseDto(newVote);
                return response;
            }
        }
    }

    // 좋아요 개수 증가
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void increaseLikeCount(TrashCan trashCan) {
        int likeCount = trashCan.getLikeCount();
        trashCan.setLikeCount(likeCount + 1);
        trashCanRepository.save(trashCan);
    }

    // 싫어요 개수 증가
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void increaseDislikeCount(TrashCan trashCan) {
        int dislikeCount = trashCan.getDislikeCount();
        trashCan.setDislikeCount(dislikeCount + 1);
        trashCanRepository.save(trashCan);
    }

    // 투표 삭제
    private void deleteVote(Vote vote) {
        voteRepository.delete(vote);
    }

    // 투표 개수 감소
    private void decreaseVoteCount(TrashCan trashCan, VoteDto.VoteTypeEnum voteType) {
        if (voteType == VoteDto.VoteTypeEnum.LIKE) {
            trashCan.setLikeCount(trashCan.getLikeCount() - 1);
        } else if (voteType == VoteDto.VoteTypeEnum.DISLIKE) {
            trashCan.setDislikeCount(trashCan.getDislikeCount() - 1);
        }
        trashCanRepository.save(trashCan);
    }

    // 투표 개수 증가
    private void increaseVoteCount(TrashCan trashCan, VoteDto.VoteTypeEnum voteType) {
        if (voteType == VoteDto.VoteTypeEnum.LIKE) {
            trashCan.setLikeCount(trashCan.getLikeCount() + 1);
        } else if (voteType == VoteDto.VoteTypeEnum.DISLIKE) {
            trashCan.setDislikeCount(trashCan.getDislikeCount() + 1);
        }
        trashCanRepository.save(trashCan);
    }


    public List<VoteDto.Response> getVotesByMember(Long memberId) {
        verifyAuthorizedMember();
        List<Vote> votes = voteRepository.findByMember_MemberId(memberId);

        return voteMapper.voteListToResponseDtoList(votes);
    }

    public List<VoteDto.Response> getVotesByTrashCan(Long trashCanId) {
        verifyAuthorizedMember();
        List<Vote> votes = voteRepository.findByTrashCanId(trashCanId);

        return voteMapper.voteListToResponseDtoList(votes);
    }

    public Member verifyExistingMember(String loginEmail) {
        // 사용자 관리 서비스를 통해 로그인한 사용자의 이메일을 검사하고, 사용자 정보를 가져오는 로직을 구현합니다.
        Optional<Member> OptionalMember = memberRepository.findByEmail(loginEmail);
        Member findMember = OptionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    public Vote findVerifiedVote(long id){
        Optional<Vote> optionalVote =
                voteRepository.findById(id);
        Vote findVote = optionalVote.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));

        return findVote;
    }

    // 로그인한 사용자가 회원 본인인지 또는 관리자인지 확인하는 메서드이다.
    private void verifyAuthorizedMember() {
        // 사용자 인증 정보 Authentication의 인스턴스 auth로 접근
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 사용자인 경우 예외 처리
        if (!auth.isAuthenticated()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        // 관리자 또는 회원 본인인 경우 처리.
        // 사용자가 로그인할때 쓰인 이메일은 principal 속성에 저장
        String loginEmail = auth.getName();

        // 만약 loginEmail이 없으면 예외처리
        if (loginEmail == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        // 관리자나 사용자 회원이 맞다면 메서드 에러 없이 종료
        else if (isAdmin(loginEmail) || verifyExistingMember(loginEmail)!=null) {
            return;
        }
        // 그 외의 경우 예외 처리
        throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);
    }

    // 관리자 여부를 확인하는 메서드
    private boolean isAdmin(String email) {
        // 관리자 이메일 주소 리스트를 adminMailAddress 변수에 저장(하드코딩)
        List<String> adminMailAddress = List.of("sy@email.com", "ny@email.com","jh@email.com","nayeon@email.com");
        return adminMailAddress.contains(email);
    }

    // 로그인 인증 정보를 가져오는 메서드
    private Authentication getAuthentication(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth;
    }
}
