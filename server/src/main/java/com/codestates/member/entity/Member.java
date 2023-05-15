package com.codestates.member.entity;

import com.codestates.audit.BaseEntity;
import com.codestates.board.entity.Board;
import com.codestates.comment.entity.Comment;
import com.codestates.plogging.entity.Plogging;
import com.codestates.plogging.service.PlogService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false, unique=true)
    private String username;

    @Column(length = 100, nullable = false)
    private String password;

    // 사용자 권한을 등록하기 위한 권한 테이블 생성
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(joinColumns = @JoinColumn(name = "MEMBER_ID"))
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    // N : 1(Member) 양방향 매핑()
     @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
     private List<Board> boards = new ArrayList<>();

     @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
     private List<Comment> comments = new ArrayList<>();
     @OneToMany(mappedBy = "member")
     private List<Plogging> ploggings;

    public void setComments(Comment comment) {
        comments.add(comment);
        if (comment.getMember() != this) {
            comment.setMember(this);
        }
    }

    public void setBoard(Board board){
        boards.add(board);
        if(board.getMember()!=this){
            board.setMember(this);
        }
    }

    public void addBoard(Board board){boards.add(board);}
    public void addComment(Comment comment){comments.add(comment);}


    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

}
