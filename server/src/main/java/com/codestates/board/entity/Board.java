package com.codestates.board.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.comment.entity.Comment;
import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
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

	//연관관계 양방향 매핑
	@ManyToOne
	@JoinColumn(name="MEMEBER_ID")
	private Member member;

	//cascade 설정으로 게시판 글이 삭제되면 달린 댓글도 같이 사라짐
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	List<Comment> comments = new ArrayList<>();


	public long getMemberId(){
		return member.getMemberId();
	}
	public String getUsername(){return member.getUsername();}
	public void addComments(Comment comment){comments.add(comment);}

}

