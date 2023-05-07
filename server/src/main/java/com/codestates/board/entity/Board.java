package com.codestates.board.entity;

import com.codestates.audit.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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
}
