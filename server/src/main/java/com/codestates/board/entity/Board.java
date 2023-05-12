package com.codestates.board.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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
	@Column
	private boolean b_good;

	// N : 1(Member) 양방향 매핑
	@ManyToOne
	@JoinColumn(name="MEMBER_ID")
	private Member member;

	@Column(nullable = false)
	private Long likes;

	@ElementCollection
	private List<Long> likedUserIds;

	@Column
	private int likedCount;          // 좋아요 개수

	public Board() {
		this.likes = 0L;
	}
}
