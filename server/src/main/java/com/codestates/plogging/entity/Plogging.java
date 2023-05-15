package com.codestates.plogging.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.member.entity.Member;
import com.codestates.plogging.comment.entity.PlogComment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "plogging",cascade = CascadeType.ALL)
    private List<PlogComment> comments = new ArrayList<>();
}
