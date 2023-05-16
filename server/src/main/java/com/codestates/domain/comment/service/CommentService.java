package com.codestates.domain.comment.service;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.board.service.BoardService;
import com.codestates.domain.comment.entity.Comment;
import com.codestates.domain.comment.repository.CommentRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.repository.MemberRepository;
import com.codestates.domain.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
	private final CommentRepository commentRepository;
	private final MemberService memberService;
	private final BoardService boardService;
	private final MemberRepository memberRepository;

	public CommentService(CommentRepository commentRepository, MemberService memberService, BoardService boardService, MemberRepository memberRepository) {
		this.commentRepository = commentRepository;
		this.memberService = memberService;
		this.boardService = boardService;
		this.memberRepository = memberRepository;
	}

	public Comment createComment(Comment comment) {


//		Board board = verifyExistingBoard(comment.getBoard());
//		Member member = verifyExistingMember(comment.getMember());
//
//		comment.setBoard(board);
//		comment.setMember(member);
//
//		member.addComment(comment);
//		board.addComment(comment);
//
//		return commentRepository.save(comment);

		// 사용자 인증 정보 Authentication의 인스턴스 auth로 접근
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
		Board board = verifyExistingBoard(comment.getBoard());
		comment.setBoard(board);
		comment.setMember(member);
		member.addComment(comment);
		board.addComment(comment);

		return commentRepository.save(comment);

	}

	public Comment updateComment(Comment comment) {
		verifyAuthorizedMember(comment.getC_id());
		Comment findComment = findVerifiedComment(comment.getC_id());

		Optional.ofNullable(comment.getC_content())
				.ifPresent(text->findComment.setC_content(text));
		Optional.ofNullable(comment.getMember())
				.ifPresent(member->findComment.setMember(member));

		return commentRepository.save(findComment);
	}

	public Comment findComment(long c_id) {
		verifyAuthorizedMember(c_id);

		Comment comment = commentRepository.findById(c_id)
						.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

		return comment;
	}

	public List<Comment> findComments() {

		// 사용자 인증 정보 Authentication의 인스턴스 auth로 접근
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
			return commentRepository.findAll();
		} else {
			throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_VALID);
		}
	}

	public void deleteComment(long c_id) {

		verifyAuthorizedMember(c_id);
		Comment comment	= commentRepository.findById(c_id)
						.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
		commentRepository.delete(comment);
	}

	public Comment findVerifiedComment(long c_id) {
		Optional<Comment> optionalBoard =
						commentRepository.findById(c_id);
		Comment findComment =
						optionalBoard.orElseThrow(() ->
										new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
		return findComment;
	}
	private Board verifyExistingBoard(Board board){
		return boardService.findVerifiedBoard(board.getB_id());
	}
	private Member verifyExistingMember(Member member) {
		return memberService.findVerifiedMember(member.getMemberId());
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
	private void verifyAuthorizedMember(Long c_id) {
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
		else if (isAdmin(loginEmail) || isOwner(loginEmail, c_id)) {
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
	private boolean isOwner(String email, Long c_id) {
		Comment comment = findVerifiedComment(c_id);
		return email.equals(comment.getMember().getEmail());
	}

}
