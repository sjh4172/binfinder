package com.codestates.vote;

import com.codestates.audit.BaseEntity;
import com.codestates.member.entity.Member;
import com.codestates.trashcan.TrashCan;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "votes")
public class Vote extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "trash_can_id")
    private TrashCan trashCan;

    @Column(nullable = false)
    private Boolean isLiked;
}

