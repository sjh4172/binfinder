package com.codestates.domain.comment.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long c_id;
	@Column(nullable = false)
	private String c_content;

	// N : 1(Member) 양방향 매핑
	@ManyToOne
	@JoinColumn(name="MEMBER_ID")
	private Member member;

	@ManyToOne
	@JoinColumn(name="B_ID")
	private Board board;

	public long getB_id(){return board.getB_id();}
	public String getUsername(){return member.getUsername();}

}
