package com.codestates.domain.vote;

import com.codestates.audit.BaseEntity;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.trashcan.TrashCan;
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
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "trash_can_id", nullable = false)
    private TrashCan trashCan;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VoteDto.VoteTypeEnum voteType;
}

