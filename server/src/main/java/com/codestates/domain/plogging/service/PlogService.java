package com.codestates.domain.plogging.service;

import com.codestates.domain.member.repository.MemberRepository;
import com.codestates.domain.member.service.MemberService;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.domain.plogging.mapper.PlogMapper;
import com.codestates.domain.plogging.repository.PlogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class PlogService {
    private final PlogRepository plogRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public PlogService(PlogRepository plogRepository, MemberService memberService, MemberRepository memberRepository) {
        this.plogRepository = plogRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    public Plogging createPlog (Plogging plogging){
        return plogRepository.save(plogging);
    }//멤버만 게시글 쓸 수 있어야 함
    public Plogging updatePlog(Plogging plogging) {
        Plogging findPlog = findVerifiedPlog(plogging.getPlogId());
        findPlog.setTitle(plogging.getTitle());
        findPlog.setContent(plogging.getContent());
        return plogRepository.save(findPlog);
    }
    //작성자만 게시글 수정을 할 수 있어야 함
    public void deletePlog(Long plogId){
        plogRepository.deleteById(plogId);
    }
    //작성자만 게시글 삭제가 가능해야 함
    public Plogging findPlog(long plogId){
        Optional<Plogging> plogging = plogRepository.findPlogWithComments(plogId);
        if(plogging.isPresent()) {
            return plogging.get();
        }
        return null;
    }
    public Page<Plogging> findPlogs(int page, int size){
        return plogRepository.findAll(PageRequest.of(page,size));
    }

    public Plogging findVerifiedPlog(Long plogId){
        Optional<Plogging> optionalPlogging =
                plogRepository.findById(plogId);
        Plogging findPlog =
                optionalPlogging.orElseThrow(()->
                        new NoSuchElementException("게시글을 찾을 수 없습니다"));
        return findPlog;
    }
    public Plogging like(long plogId, long memberId){
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(()-> new NoSuchElementException("게시글을 찾을 수 없습니다"));
        List<Long> likedMember = plogging.getLikedUserIds();
        if (!likedMember.contains(memberId)) {
            likedMember.add(memberId);
            plogging.setLikedUserIds(likedMember);
            plogging.setLikes(plogging.getLikes() + 1);
        }
        return plogRepository.save(plogging);
    }
    public Plogging unLike(long plogId, long memberId){
        Plogging plogging = plogRepository.findById(plogId)
                .orElseThrow(()-> new NoSuchElementException("게시글을 찾을 수 없습니다"));
        List<Long> likedMember = plogging.getLikedUserIds();
        if (likedMember.remove(memberId)) {
            likedMember.add(memberId);
            plogging.setLikedUserIds(likedMember);
            plogging.setLikes(plogging.getLikes() - 1);
        }
        return plogRepository.save(plogging);
    }

}