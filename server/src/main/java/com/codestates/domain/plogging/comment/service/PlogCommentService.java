package com.codestates.domain.plogging.comment.service;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.comment.entity.Comment;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.repository.MemberRepository;
import com.codestates.domain.member.service.MemberService;
import com.codestates.domain.plogging.comment.entity.PlogComment;
import com.codestates.domain.plogging.comment.repository.PlogCommentRepository;
import com.codestates.domain.plogging.repository.PlogRepository;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.domain.plogging.service.PlogService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PlogCommentService {
    public final PlogCommentRepository plogCommentRepository;
    public final PlogRepository plogRepository;
    private final PlogService plogService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;


    public PlogCommentService(PlogCommentRepository plogCommentRepository, PlogRepository plogRepository, PlogService plogService, MemberService memberService, MemberRepository memberRepository) {
        this.plogCommentRepository = plogCommentRepository;
        this.plogRepository = plogRepository;
        this.plogService = plogService;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public PlogComment createPlogComment(PlogComment plogComment){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 사용자인 경우 예외 처리
        if (!auth.isAuthenticated()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        // 사용자가 로그인할 때 사용된 이메일은 principal 속성에 저장되어 있습니다.
        String loginEmail = auth.getName();

        // 만약 loginEmail이 없으면 예외 처리
        if (loginEmail == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        // Member를 찾아옵니다.
        Member member = verifyExistingMember(loginEmail);

        // 이후 로직은 기존과 동일하게 진행합니다.
        Plogging plogging = verifyExistingPlog(plogComment.getPlogging());
        plogComment.setPlogging(plogging);
        plogComment.setMember(member);
        member.addP_comment(plogComment);
        plogging.addP_comment(plogComment);

        plogging.setP_commentCount(increaseCommentCount(plogging.getP_id()));

        return plogCommentRepository.save(plogComment);
    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public PlogComment updatePlogComment(PlogComment plogComment){
        verifyAuthorizedMember(plogComment.getPlogCommentId());
        PlogComment findPComment = findVerifiedPlogComment(plogComment.getPlogCommentId());
        findPComment.setPlogComment(plogComment.getPlogComment());
        return plogCommentRepository.save(findPComment);
    }
//    public PlogComment findPlogComment(long plogCommentId){
//        PlogComment plogComment = plogCommentRepository.findById(plogCommentId)
//                .orElseThrow(()-> new NoSuchElementException("댓글이 없습니다."));
//        return plogComment;
//    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Page<PlogComment>findPlogComments(int page, int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 사용자인 경우 예외 처리
        if (!auth.isAuthenticated()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        // 사용자가 로그인할 때 사용된 이메일은 principal 속성에 저장되어 있습니다.
        String loginEmail = auth.getName();

        // 만약 loginEmail이 없으면 예외 처리
        if (loginEmail == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        // 관리자 또는 회원인 경우에만 조회를 허용합니다.
        if (isAdmin(loginEmail) || isMember(loginEmail)) {
            return plogCommentRepository.findAll(PageRequest.of(page,size));
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);
        }

    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void deletePlogComment(long plogCommentId){
        verifyAuthorizedMember(plogCommentId);
       PlogComment plogComment = plogCommentRepository.findById(plogCommentId)
               .orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        decreaseCommentCount(plogComment.getPlogging().getP_id());
        plogCommentRepository.delete(plogComment);
    }
    public PlogComment findVerifiedPlogComment(long plogCommentId){
        Optional<PlogComment> optionalPlogComment =
                plogCommentRepository.findById(plogCommentId);
        return optionalPlogComment.orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    private int increaseCommentCount(Long plogId) {
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find PlogPost with ID: " + plogId));
        plogging.setP_commentCount(plogging.getP_commentCount() + 1);
        return plogging.getP_commentCount();
    }

    private void decreaseCommentCount(Long plogId) {
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find PlogPost with ID: " + plogId));
        plogging.setP_commentCount(plogging.getP_commentCount() - 1);
        plogRepository.save(plogging);
    }
//    private Plogging verifyExistingPlog(Plogging plogging){
//        return plogService.findVerifiedPlog(plogging.getP_id());
//    }

    // 예외 처리
    private Plogging verifyExistingPlog(Plogging plogging){
        Plogging existingPlog = plogService.findVerifiedPlog(plogging.getP_id());
        if (existingPlog == null) {
            throw new RuntimeException("Plogging not found"); // 원하는 예외 처리 방식으로 변경 가능
        }
        return existingPlog;
    }

    public Member verifyExistingMember(String loginEmail) {
        // 사용자 관리 서비스를 통해 로그인한 사용자의 이메일을 검사하고, 사용자 정보를 가져오는 로직을 구현합니다.
        Optional<Member> OptionalMember = memberRepository.findByEmail(loginEmail);
        Member findMember = OptionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }
    private boolean isMember(String email) {
        Member member = verifyExistingMember(email);
        return member != null;
    }

    // 로그인한 사용자가 회원 본인인지 또는 관리자인지 확인하는 메서드이다.
    private void verifyAuthorizedMember(Long pc_id) {
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
        else if (isAdmin(loginEmail) || isOwner(loginEmail, pc_id)) {
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
    // 오버로딩
    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }

    // 사용자 여부를 확인하는 메서드
    private boolean isOwner(String email, Long p_id) {
        PlogComment comment = findVerifiedPlogComment(p_id);
        return email.equals(comment.getMember().getEmail());
    }

}
