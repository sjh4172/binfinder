package com.codestates.domain.plogging.comment.service;

import com.codestates.domain.plogging.comment.entity.PlogComment;
import com.codestates.domain.plogging.comment.repository.PlogCommentRepository;
import com.codestates.domain.plogging.repository.PlogRepository;
import com.codestates.domain.plogging.entity.Plogging;
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

    public PlogComment createPlogComment(Long plogId, PlogComment plogComment){
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find PlogPost with ID: " + plogId));
        plogComment.setPlogging(plogging);
        increaseCommentCount(plogId);
        return plogCommentRepository.save(plogComment);
    }
    public PlogComment updatePlogComment(PlogComment plogComment){
        PlogComment findPComment = findVerifiedPlogComment(plogComment.getPlogCommentId());
        findPComment.setPlogComment(plogComment.getPlogComment());
        return plogCommentRepository.save(findPComment);
    }
//    public PlogComment findPlogComment(long plogCommentId){
//        PlogComment plogComment = plogCommentRepository.findById(plogCommentId)
//                .orElseThrow(()-> new NoSuchElementException("댓글이 없습니다."));
//        return plogComment;
//    }
    public Page<PlogComment>findPlogComments(int page, int size){
        return plogCommentRepository.findAll(PageRequest.of(page,size));
    }
    public void deletePlogComment(long plogCommentId){
       PlogComment plogComment = plogCommentRepository.findById(plogCommentId)
               .orElseThrow(()->new NoSuchElementException("댓글이 없습니다."));
        decreaseCommentCount(plogComment.getPlogging().getP_id());
        plogCommentRepository.delete(plogComment);
    }
    public PlogComment findVerifiedPlogComment(long plogCommentId){
        Optional<PlogComment> optionalPlogComment =
                plogCommentRepository.findById(plogCommentId);
        return optionalPlogComment.orElseThrow(()->new NoSuchElementException("댓글이 없습니다."));
    }
    private void increaseCommentCount(Long plogId) {
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find PlogPost with ID: " + plogId));
        plogging.setP_commentCount(plogging.getP_commentCount() + 1);
        plogRepository.save(plogging);
    }

    private void decreaseCommentCount(Long plogId) {
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find PlogPost with ID: " + plogId));
        plogging.setP_commentCount(plogging.getP_commentCount() - 1);
        plogRepository.save(plogging);
    }
}
