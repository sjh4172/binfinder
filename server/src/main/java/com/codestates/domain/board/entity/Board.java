package com.codestates.domain.board.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.domain.comment.entity.Comment;
import com.codestates.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class Board extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long b_id;
	@Column
	private String b_title;
	@Column(columnDefinition = "TEXT")
	private String b_content;
	@Column
	private boolean checkLike;
	// N : 1(Member) 양방향 매핑
	// todo 질문이 삭제 될 때, 질문에 달린 답변도 삭제되어야 함으로, 질문 엔티티에 cascade 설정이 되어있어야 한다.

	@ManyToOne
	@JoinColumn(name="MEMBER_ID")
	private Member member;

	// todo 게시글이 삭제 될 때, 게시글에 달린 댓글도 삭제되어야 함으로, Board 엔티티에 cascade 설정이 되어있어야 한다.
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	List<Comment> comments = new ArrayList<>();

	@Column(nullable = false)
	private Long likes;

	@ElementCollection
	private List<Long> likedUserIds;

	public Board() {
		this.likes = 0L;
	}
	public void addComment(Comment comment){
		comments.add(comment);
	}
	public String getUsername(){return member.getUsername();}
}
