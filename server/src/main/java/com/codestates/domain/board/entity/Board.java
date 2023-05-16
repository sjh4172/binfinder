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
	@Column
	private String b_content;

	// N : 1(Member) 양방향 매핑
	@ManyToOne
	@JoinColumn(name="MEMBER_ID")
	private Member member;

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
