package com.codestates.trashcan;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trash-cans")
public class TrashCanController {

    private final TrashCanService trashCanService;
    private final TrashCanMapper trashCanMapper;

    public TrashCanController(TrashCanService trashCanService, TrashCanMapper trashCanMapper) {
        this.trashCanService = trashCanService;
        this.trashCanMapper = trashCanMapper;
    }

    @GetMapping
    public ResponseEntity<List<TrashCanDto.Response>> getAllTrashCans() {
        List<TrashCanDto.Response> trashCanDtos = trashCanService.getAllTrashCans();
        return ResponseEntity.ok(trashCanDtos);
    }

    @PostMapping
    public ResponseEntity<TrashCanDto.Response> createTrashCan(@RequestBody TrashCanDto.CreateRequest createRequest) {
        TrashCan createdTrashCan = trashCanService.createTrashCan(trashCanMapper.createRequestToTrashCan(createRequest));
        return ResponseEntity.status(HttpStatus.CREATED).body(trashCanMapper.trashCanToResponseDto(createdTrashCan));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrashCanDto.Response> getTrashCan(@PathVariable Long id) {
        TrashCan foundTrashCan = trashCanService.getTrashCan(id);
        return ResponseEntity.status(HttpStatus.OK).body(trashCanMapper.trashCanToResponseDto(foundTrashCan));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TrashCanDto.Response> updateTrashCan(@PathVariable Long id, @RequestBody TrashCanDto.UpdateRequest updateRequest) {
        TrashCan updatedTrashCan = trashCanService.updateTrashCan(id, trashCanMapper.updateRequestToTrashCan(updateRequest));
        return ResponseEntity.status(HttpStatus.OK).body(trashCanMapper.trashCanToResponseDto(updatedTrashCan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrashCan(@PathVariable Long id) {
        trashCanService.deleteTrashCan(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

