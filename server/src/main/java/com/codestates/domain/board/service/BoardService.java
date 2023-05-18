package com.codestates.domain.board.service;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.repository.MemberRepository;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.domain.board.repository.BoardRepository;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
	private final BoardRepository boardRepository;

	private final MemberService memberService;
	private final MemberRepository memberRepository;

	// DI


	public BoardService(BoardRepository boardRepository, MemberService memberService, MemberRepository memberRepository) {
		this.boardRepository = boardRepository;
		this.memberService = memberService;
		this.memberRepository = memberRepository;
	}

	public Board createBoard(Board board) {

		// 사용자 인증 정보 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		// 인증된 사용자만 접근 가능하도록 확인
		if (authentication.isAuthenticated()) {
			// 인증된 사용자의 아이디 추출
			String loginEmail = authentication.getName();

			// 로그인한 사용자 정보로 멤버 확인
			Member member = verifyExistingMember(loginEmail);

			// 게시글 작성자 설정
			board.setMember(member);
			member.setBoard(board);

			return boardRepository.save(board);
		} else {
			throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
		}
	}

	public Board updateBoard(Board board) {

		verifyAuthorizedMember(board.getB_id());

		Board findBoard = findVerifiedBoard(board.getB_id());

		findBoard.setB_title(board.getB_title());
		findBoard.setB_content(board.getB_content());

		return boardRepository.save(findBoard);
	}

	public Board findBoard(long b_id) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		// 인증된 사용자만 접근 가능하도록 확인
		if (authentication.isAuthenticated()) {
			// 인증된 사용자의 아이디 추출
			String loginEmail = authentication.getName();

			// 로그인한 사용자 정보로 멤버 확인
			Member member = verifyExistingMember(loginEmail);

			Board board = boardRepository.findById(b_id)
							.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
			List<Long> likedUserIds = board.getLikedUserIds();
			if (!likedUserIds.contains(member.getMemberId())) {
				board.setCheckLike(false);
			} else {
				board.setCheckLike(true);
			}
			return board;
		}else {
			throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
		}
	}


	public Board findBoardWithComment(long b_id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		// 인증된 사용자만 접근 가능하도록 확인
		if (!authentication.isAuthenticated()) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
		}

		// 인증된 사용자의 아이디 추출
		String loginEmail = authentication.getName();

		// 로그인한 사용자 정보로 멤버 확인
		Member member = verifyExistingMember(loginEmail);

		Optional<Board> optionalBoard = boardRepository.findBoardWithComments(b_id);
		if (optionalBoard.isPresent()) {
			Board board = optionalBoard.get();
			List<Long> likedUserIds = board.getLikedUserIds();
			board.setCheckLike(likedUserIds.contains(member.getMemberId()));
			return board;
		} else {
			throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
		}
	}

	public Page<Board> findBoards(Pageable pageable) {
		return boardRepository.findAll(pageable);
	}

	public void deleteBoard(long b_id) {

		verifyAuthorizedMember(b_id);

		Board board = boardRepository.findById(b_id)
						.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
		boardRepository.delete(board);
	}


	public Board findVerifiedBoard(long b_id) {
		Optional<Board> optionalBoard =
						boardRepository.findById(b_id);
		Board findBoard = optionalBoard.orElseThrow(() ->
						new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
		return findBoard;
	}

	public Board addLike(long b_id, long m_id) {
		Board board = boardRepository.findById(b_id).orElseThrow(() -> new RuntimeException("Board not found"));
		List<Long> likedUserIds = board.getLikedUserIds();

		if (!likedUserIds.contains(m_id)) {
			likedUserIds.add(m_id);
			board.setLikedUserIds(likedUserIds);
			board.setLikes(board.getLikes() + 1);
		}

		return boardRepository.save(board);
	}

	public Board removeLike(long b_id, long m_id) {
		Board board = boardRepository.findById(b_id).orElseThrow(() -> new RuntimeException("Board not found"));
		List<Long> likedUserIds = board.getLikedUserIds();
		if (likedUserIds.remove(m_id)) {
			board.setLikedUserIds(likedUserIds);
			board.setLikes(board.getLikes() - 1);
		}
		return boardRepository.save(board);
	}

	private Member verifyExistingMember(Member member){
		return memberService.findVerifiedMember(member.getMemberId());
	}

	public Member verifyExistingMember(String loginEmail) {
		// 사용자 관리 서비스를 통해 로그인한 사용자의 이메일을 검사하고, 사용자 정보를 가져오는 로직을 구현합니다.
		Optional<Member> OptionalMember = memberRepository.findByEmail(loginEmail);
		Member findMember = OptionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

		return findMember;
	}

	// 로그인한 사용자가 회원 본인인지 또는 관리자인지 확인하는 메서드이다.
	private void verifyAuthorizedMember(Long b_id) {
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
		else if (isAdmin(loginEmail) || isOwner(loginEmail, b_id)) {
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
	private boolean isOwner(String email, Long b_id) {
		Board board = findVerifiedBoard(b_id);
		return email.equals(board.getMember().getEmail());
	}
}
