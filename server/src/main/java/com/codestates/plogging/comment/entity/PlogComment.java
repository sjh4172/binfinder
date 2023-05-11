package com. codestates.plogging.comment.entity;
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
public class PlogComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plogCommentId;
    @Column(nullable = false)
    @NotBlank
    private String plogComment;
    @ManyToOne
    @JoinColumn(name = "plog_id")
    private Plogging plogging;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
