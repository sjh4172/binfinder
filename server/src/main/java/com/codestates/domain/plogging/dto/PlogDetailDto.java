package com.codestates.domain.plogging.dto;

import com.codestates.domain.member.entity.Member;
import com.codestates.domain.plogging.comment.dto.PlogCommentResponseDto;
import com.codestates.domain.plogging.comment.entity.PlogComment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlogDetailDto {
    private Long p_id;
    private String p_title;
    private String p_content;
    private Long memberId;
    private String username;
    private boolean checkParticipation;;
    private Integer likes;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Integer p_commentCount;
    private List<PlogCommentResponseDto> comments = new ArrayList<>();
    public void setMember(Member member){this.memberId= member.getMemberId();}
//    public void setComments(List<PlogComment> plogComments) {
//        List<PlogCommentResponseDto> commentDtos = new ArrayList<>();
//        for (PlogComment plogComment : plogComments) {
//            PlogCommentResponseDto commentDto = new PlogCommentResponseDto();
//            commentDto.setMember(plogComment.getMember());
//            commentDto.setPlogCommentId(plogComment.getPlogCommentId());
//            commentDto.setPlogComment(plogComment.getPlogComment());
//            commentDto.setP_id(plogComment.getPlogging().getP_id());
//            commentDto.setUsername(plogComment.getMember().getUsername());
//            commentDto.setCreatedAt(plogComment.getCreatedAt());
//            commentDto.setModifiedAt(plogComment.getModifiedAt());
//            commentDtos.add(commentDto);
//        }
//        this.comments = commentDtos;



}
