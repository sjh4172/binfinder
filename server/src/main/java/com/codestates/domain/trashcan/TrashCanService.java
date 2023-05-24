package com.codestates.domain.trashcan;

import com.codestates.domain.vote.VoteDto;
import com.codestates.domain.vote.VoteRepository;
import com.codestates.domain.vote.VoteService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TrashCanService {

    private final TrashCanRepository trashCanRepository;
    private final TrashCanMapper trashCanMapper;
    private final VoteService voteService;
    private final VoteRepository voteRepository;

    @Autowired
    public TrashCanService(TrashCanRepository trashCanRepository, TrashCanMapper trashCanMapper, VoteService voteService, VoteRepository voteRepository) {
        this.trashCanRepository = trashCanRepository;
        this.trashCanMapper = trashCanMapper;
        this.voteService = voteService;
        this.voteRepository = voteRepository;
    }

    // 쓰레기통 생성?
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public TrashCan createTrashCan(TrashCan trashCan) {

        return trashCanRepository.save(trashCan);
    }

    // 전체 쓰레기통 조회
    public List<TrashCanDto.Response> getAllTrashCans() {
        List<TrashCan> trashCans = trashCanRepository.findAll();

        return trashCanMapper.trashCanListToResponseDtoList(trashCans);
    }


    // 특정 쓰레기통 조회
    public TrashCan getTrashCan(Long id) {
        TrashCan findTrashCan = findVerifiedTrashCan(id);

        int likeCount = voteRepository.countVotesByTrashCanAndVoteType(findTrashCan, VoteDto.VoteTypeEnum.LIKE);
        int dislikeCount = voteRepository.countVotesByTrashCanAndVoteType(findTrashCan, VoteDto.VoteTypeEnum.DISLIKE);

        findTrashCan.setLikeCount(likeCount);
        findTrashCan.setDislikeCount(dislikeCount);

        return findTrashCan;
    }


    // 쓰레기통 정보 업데이트
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public TrashCan updateTrashCan(Long id, TrashCan updatedTrashCan) {


        TrashCan existingTrashCan = findVerifiedTrashCan(id);

        existingTrashCan.setLatitude(updatedTrashCan.getLatitude());
        existingTrashCan.setLongitude(updatedTrashCan.getLongitude());
        existingTrashCan.setLocation(updatedTrashCan.getLocation());
        existingTrashCan.setCanType(updatedTrashCan.getCanType());
        existingTrashCan.setLikeCount(updatedTrashCan.getLikeCount());
        existingTrashCan.setDislikeCount(updatedTrashCan.getDislikeCount());

        return trashCanRepository.save(existingTrashCan);
    }

    // 쓰레기통 삭제
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void deleteTrashCan(Long id) {
        trashCanRepository.deleteById(id);
    }

    // 쓰레기통 있는지 확인하고 가져오는 메서드
    public TrashCan findVerifiedTrashCan(long id){
        Optional<TrashCan> optionalTrashCan = trashCanRepository.findById(id);

        return optionalTrashCan.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.TRASH_CAN_NOT_FOUND));
    }


}

