package com.codestates.domain.trashcan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TrashCanService {

    private final TrashCanRepository trashCanRepository;
    private final TrashCanMapper trashCanMapper;

    @Autowired
    public TrashCanService(TrashCanRepository trashCanRepository, TrashCanMapper trashCanMapper) {
        this.trashCanRepository = trashCanRepository;
        this.trashCanMapper = trashCanMapper;
    }

    public TrashCan createTrashCan(TrashCan trashCan) {
        return trashCanRepository.save(trashCan);
    }

    public List<TrashCanDto.Response> getAllTrashCans() {
        List<TrashCan> trashCans = trashCanRepository.findAll();
        return trashCanMapper.trashCanListToResponseDtoList(trashCans);
    }


    public TrashCan getTrashCan(Long id) {
        return trashCanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TrashCan not found with id: " + id));
    }

    public TrashCan updateTrashCan(Long id, TrashCan updatedTrashCan) {
        TrashCan existingTrashCan = trashCanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TrashCan not found with id: " + id));
        existingTrashCan.setLatitude(updatedTrashCan.getLatitude());
        existingTrashCan.setLongitude(updatedTrashCan.getLongitude());
        existingTrashCan.setLocation(updatedTrashCan.getLocation());
        existingTrashCan.setCanType(updatedTrashCan.getCanType());
        return trashCanRepository.save(existingTrashCan);
    }

    public void deleteTrashCan(Long id) {
        trashCanRepository.deleteById(id);
    }
}

