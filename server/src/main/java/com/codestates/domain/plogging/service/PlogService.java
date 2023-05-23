package com.codestates.domain.plogging.service;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.repository.MemberRepository;
import com.codestates.domain.member.service.MemberService;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.domain.plogging.mapper.PlogMapper;
import com.codestates.domain.plogging.repository.PlogRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class PlogService {
    private final PlogRepository plogRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public PlogService(PlogRepository plogRepository, MemberService memberService, MemberRepository memberRepository) {
        this.plogRepository = plogRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    public Plogging createPlog (Plogging plogging) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated()) {
            // 인증된 사용자의 아이디 추출
            String loginEmail = authentication.getName();

            // 로그인한 사용자 정보로 멤버 확인
            Member member = verifyExistingMember(loginEmail);

            // 게시글 작성자 설정
            plogging.setMember(member);
            member.setPlog(plogging);

            return plogRepository.save(plogging);
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
    }//멤버만 게시글 쓸 수 있어야 함
    public Plogging updatePlog(Plogging plogging) {
        verifyAuthorizedMember(plogging.getP_id());
        Plogging findPlog = findVerifiedPlog(plogging.getP_id());
        findPlog.setP_title(plogging.getP_title());
        findPlog.setP_content(plogging.getP_content());
        return plogRepository.save(findPlog);
    }
    //작성자만 게시글 수정을 할 수 있어야 함
    public void deletePlog(Long p_id){
        verifyAuthorizedMember(p_id);
        Plogging plogging = plogRepository.findById(p_id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        plogRepository.delete(plogging);
    }
    //작성자만 게시글 삭제가 가능해야 함
    public Plogging findPlog(long p_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.isAuthenticated()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        String loginEmail = authentication.getName();
        // 로그인한 사용자 정보로 멤버 확인
        Member member = verifyExistingMember(loginEmail);

        Optional<Plogging> optionalPlog = plogRepository.findPlogWithComments(p_id);
        if(optionalPlog.isPresent()) {
            Plogging plogging = optionalPlog.get();
            List<Long> likedUserIds = plogging.getLikedUserIds();
            plogging.setCheckLike(likedUserIds.contains(member.getMemberId()));
            return plogging;
        } else {
            throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);

        }
    }
    public Page<Plogging> findPlogs(int page, int size){
        return plogRepository.findAll(PageRequest.of(page,size));
    }
    public long getTotalPages(int size) {
        long totalPlogs = plogRepository.count();
        return (totalPlogs + size - 1) / size;
    }

    public Plogging findVerifiedPlog(Long p_id){
        Optional<Plogging> optionalPlog =
                plogRepository.findById(p_id);
        Plogging findPlog =
                optionalPlog.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findPlog;
    }
    public Plogging like(long p_id, long m_id){
        Plogging plogging = plogRepository.findById(p_id)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        List<Long> likedMember = plogging.getLikedUserIds();
        if (!likedMember.contains(m_id)) {
            likedMember.add(m_id);
            plogging.setLikedUserIds(likedMember);
            plogging.setLikes(plogging.getLikes() + 1);
            plogging.setCheckLike(true);
        }
        return plogRepository.save(plogging);
    }
    public Plogging unLike(long p_id, long m_id){
        memberService.verifyAuthorizedMember(p_id);
        Plogging plogging = plogRepository.findById(p_id)
                .orElseThrow(()-> new RuntimeException("게시글을 찾을 수 없습니다"));
        List<Long> likedMember = plogging.getLikedUserIds();
        if (likedMember.remove(m_id)) {
            likedMember.add(m_id);
            plogging.setLikedUserIds(likedMember);
            plogging.setLikes(plogging.getLikes() - 1);
            plogging.setCheckLike(false);
        }
        return plogRepository.save(plogging);
    }
    private Member verifyExistingMember(String loginEmail){
        Optional<Member> OptionalMember = memberRepository.findByEmail(loginEmail);
        Member findMember = OptionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }
    private void verifyAuthorizedMember(Long p_id) {
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
        else if (isAdmin(loginEmail) || isOwner(loginEmail, p_id)) {
            return;
        }
        // 그 외의 경우 예외 처리
        throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);
    }
    private boolean isAdmin(String email) {
        // 관리자 이메일 주소 리스트를 adminMailAddress 변수에 저장(하드코딩)
        List<String> adminMailAddress = List.of("sy@email.com", "ny@email.com","jh@email.com","nayeon@email.com");
        return adminMailAddress.contains(email);
    }


    // 사용자 여부를 확인하는 메서드
    private boolean isOwner(String email, Long p_id) {
        Plogging plogging = findVerifiedPlog(p_id);
        return email.equals(plogging.getMember().getEmail());
    }

}
