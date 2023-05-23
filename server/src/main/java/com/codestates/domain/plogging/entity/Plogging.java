package com.codestates.domain.plogging.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.plogging.comment.entity.PlogComment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class Plogging extends BaseEntity {

    //private Long memberId;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long p_id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;
    @Column(length = 100)
    @NotBlank
    private String p_title;
    @Column(columnDefinition = "TEXT")
    @NotBlank
    private String p_content;
    @Column(nullable = false)
    private Integer likes;
    @Column
    private boolean checkLike;
    @OneToMany(mappedBy = "plogging",cascade = CascadeType.ALL)
    private List<PlogComment> p_comments = new ArrayList<>();
    @ElementCollection
    private List<Long> likedUserIds;
    public Plogging(){
        this.likes = 0;
    }
    @Column
    private int p_commentCount;
    public void addP_comment(PlogComment plogComment){
        p_comments.add(plogComment);
    }
    public String getUsername(){return member.getUsername();}
}
