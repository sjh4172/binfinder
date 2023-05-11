package com.codestates.plogging.comment.service;

import com.codestates.plogging.comment.entity.PlogComment;
import com.codestates.plogging.comment.repository.PlogCommentRepository;
import com.codestates.plogging.entity.Plogging;
import com.codestates.plogging.repository.PlogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PlogCommentService {
    public final PlogCommentRepository plogCommentRepository;
    public final PlogRepository plogRepository;

    public PlogCommentService(PlogCommentRepository plogCommentRepository, PlogRepository plogRepository) {
        this.plogCommentRepository = plogCommentRepository;
        this.plogRepository = plogRepository;
    }

    public PlogComment createPlogComment(Long postId, PlogComment plogComment){
        Plogging plogging = plogRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find PlogPost with ID: " + postId));
        plogComment.setPlogging(plogging);
        return plogCommentRepository.save(plogComment);
    }
    public PlogComment updatePlogComment(PlogComment plogComment){
        PlogComment findPComment = findVerifiedPlogComment(plogComment.getPlogCommentId());
        findPComment.setPlogComment(plogComment.getPlogComment());
        return plogCommentRepository.save(findPComment);
    }
    public PlogComment findPlogComment(long plogCommentId){
        PlogComment plogComment = plogCommentRepository.findById(plogCommentId)
                .orElseThrow(()-> new NoSuchElementException("댓글이 없습니다."));
        return plogComment;
    }
    public Page<PlogComment>findPlogComments(int page, int size){
        return plogCommentRepository.findAll(PageRequest.of(page,size));
    }
    public void deletePlogComment(long plogCommentId){
       PlogComment plogComment = plogCommentRepository.findById(plogCommentId)
               .orElseThrow(()->new NoSuchElementException("댓글이 없습니다."));
        plogCommentRepository.delete(plogComment);
    }
    public PlogComment findVerifiedPlogComment(long plogCommentId){
        Optional<PlogComment> optionalPlogComment =
                plogCommentRepository.findById(plogCommentId);
        PlogComment findPlogComment =
                optionalPlogComment.orElseThrow(()->new NoSuchElementException("댓글이 없습니다."));
        return findPlogComment;
    }
}
