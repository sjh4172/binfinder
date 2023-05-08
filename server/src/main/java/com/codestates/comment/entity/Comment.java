package com.codestates.comment.entity;

import com.codestates.member.entity.Member;
import com.codestates.plogging.entity.Plogging;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Column(nullable = false)
    @NotBlank
    private String comment;
    @ManyToOne
    @JoinColumn(name = "plog_id")
    private Plogging plogging;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
