package com.codestates.member.service;

import com.codestates.auth.CustomAuthorityUtils;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder; // SpringSecurity
    private final CustomAuthorityUtils authorityUtils; // SpringSecurity

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

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

        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getUsername())
                .ifPresent(name -> findMember.setUsername(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        verifyAuthorizedMember(memberId);
        return findVerifiedMember(memberId);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public void deleteMember(long memberId) {
        verifyAuthorizedMember(memberId);

        memberRepository.delete(findVerifiedMember(memberId));
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    private void verifyAuthorizedMember(Long memberId) {
        // 현재 로그인한 회원의 이메일을 찾는 로직
        String loginEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 회원가입을 진행한 실제 회원 객체를 찾는 로직
        final String ownerMemberEmail = findVerifiedMember(memberId).getEmail();
        // 관리자 계정 리스트
        List<String> adminMailAddress = List.of("sy@email.com", "ny@email.com","jh@email.com","nayeon@email.com");

        // 회원가입을 진행한 실제 회원 객체의 email 과 로그인한 회원의 email 이 동일한지 조건문을 통해서 검사한다.
        if(adminMailAddress.contains(loginEmail)) return;
        else if (loginEmail.equals(ownerMemberEmail)) return;
        else throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);

    }

}
