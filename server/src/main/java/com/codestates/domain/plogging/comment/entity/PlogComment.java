package com.codestates.domain.plogging.comment.entity;
import com.codestates.audit.BaseEntity;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.plogging.entity.Plogging;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class PlogComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plogCommentId;

    @Column(nullable = false)
    @NotBlank
    private String plogComment;

    @ManyToOne
    @JoinColumn(name = "p_id")
    private Plogging plogging;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public long getP_id(){return plogging.getP_id();}
    public String getUsername(){return member.getUsername();}
}
