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
    // 좋아요, 싫어요 투표하기
    public VoteDto.Response createVote(VoteDto.CreateRequest createRequest) {
        // 사용자 인증
        verifyAuthorizedMember();
        Member member = verifyExistingMember(getAuthentication().getName());

        // 쓰레기통 정보 조회
        TrashCan trashCan = trashCanRepository.findById(createRequest.getTrashCanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRASH_CAN_NOT_FOUND));

        VoteDto.VoteTypeEnum voteTypeEnum = createRequest.getVoteType();

        // 게시글 작성자 설정
        Vote vote = new Vote();
        vote.setMember(member);
        vote.setTrashCan(trashCan);
        vote.setVoteType(voteTypeEnum);
        vote = voteRepository.save(vote);


        VoteDto.Response response = voteMapper.voteToResponseDto(vote);
        return response;
    }

    // 투표 수정
    public VoteDto.Response updateVote(VoteDto.CreateRequest createRequest) {

        verifyAuthorizedMember();
        Member member = verifyExistingMember(getAuthentication().getName());

        // 쓰레기통 정보 조회
        TrashCan trashCan = trashCanRepository.findById(createRequest.getTrashCanId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRASH_CAN_NOT_FOUND));

        VoteDto.VoteTypeEnum voteTypeEnum = createRequest.getVoteType();

        // 게시글 작성자 설정
        Vote vote = new Vote();
        vote.setMember(member);
        vote.setTrashCan(trashCan);
        vote.setVoteType(voteTypeEnum);
        vote = voteRepository.save(vote);

        VoteDto.Response response = voteMapper.voteToResponseDto(vote);
        return response;
    }

    // 로그인 한 사람만 삭제!
    public void deleteVote(Long voteId)  {

//        verifyAuthorizedMember();
        Vote vote = findVerifiedVote(voteId);
        voteRepository.delete(vote);
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