package com.codestates.plogging.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Plogging extends BaseEntity {

    //private Long memberId;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plog_id")
    private Long plogId;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @Column(length = 100)
    @NotBlank
    private String title;
    @Column
    @NotBlank
    private String content;
    private Integer likeCount;
}
