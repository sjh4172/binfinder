package com.codestates.domain.member.service;

import com.codestates.auth.CustomAuthorityUtils;
import com.codestates.domain.member.entity.Member;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.domain.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder; // SpringSecurity
    private final CustomAuthorityUtils authorityUtils; // SpringSecurity

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        // 패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // DB에 User role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        // 회원 가입에 성공하면 로그 출력
        log.info("###############################################");
        log.info("### 계정 명 :{} 님 께서 회원가입 하셨습니다. ###",member.getEmail());
        log.info("### 해당 계정( {} )은 {} 권한입니다. ###",member.getEmail(), member.getRoles().get(0));
        log.info("###############################################");

        return memberRepository.save(member);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {

        verifyAuthorizedMember(member.getMemberId());
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getUsername())
                .ifPresent(name -> findMember.setUsername(name));
        Optional.ofNullable(member.getPassword())
                        .ifPresent(password->findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {

        verifyAuthorizedMember(memberId);
        Member findMember = findVerifiedMember(memberId);

        return findMember;
    }

    public List<Member> findMembers() {
        if(!isAdmin()){
            throw new AccessDeniedException("관리자 권한이 필요합니다.");
        }
        return memberRepository.findAll();
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void deleteMember(long memberId) {
        verifyAuthorizedMember(memberId);
        memberRepository.delete(findVerifiedMember(memberId));
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    // 로그인한 사용자가 회원 본인인지 또는 관리자인지 확인하는 메서드이다.
    private void verifyAuthorizedMember(Long memberId) {
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
        else if (isAdmin(loginEmail) || isOwner(loginEmail, memberId)) {
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
    private boolean isOwner(String email, Long memberId) {
        Member member = findVerifiedMember(memberId);
        return email.equals(member.getEmail());
    }
}