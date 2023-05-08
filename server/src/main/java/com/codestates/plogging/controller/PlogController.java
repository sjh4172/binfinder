package com.codestates.plogging.controller;

import com.codestates.plogging.dto.PlogPatchDto;
import com.codestates.plogging.dto.PlogPostDto;
import com.codestates.plogging.dto.PlogResponseDto;
import com.codestates.plogging.entity.Plogging;
import com.codestates.plogging.mapper.PlogMapper;
import com.codestates.plogging.service.PlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plogs")
public class PlogController {

    private final PlogService plogService;
    private final PlogMapper plogMapper;

    public PlogController(PlogService plogService, PlogMapper plogMapper) {
        this.plogService = plogService;
        this.plogMapper = plogMapper;
    }

    // 게시글 생성
//    @PostMapping
//    public ResponseEntity<PlogResponseDto> createPlog(@Valid @RequestBody PlogPostDto plogPostDto) {
//        Plogging createdPlog = plogService.createPlog(plogPostDto);
//        PlogResponseDto plogResponseDto = plogMapper.ploggingToPlogResponseDto(createdPlog);
//        return ResponseEntity.created(URI.create("/api/plogs/" + plogResponseDto.getPlogId())).body(plogResponseDto);
//    }
    @PostMapping
    public ResponseEntity<PlogPostDto> createPlog(@Valid @RequestBody PlogPostDto plogPostDto) {
        Plogging createdPlog = plogService.createPlog(plogPostDto);
        PlogPostDto createdPlogDto = plogMapper.ploggingToPlogPostDto(createdPlog);
        return ResponseEntity.created(URI.create("/api/plogs/" + createdPlogDto.getPlogId())).body(createdPlogDto);
    }


    // 게시글 상세 조회
    @GetMapping("/{plogId}")
    public ResponseEntity<PlogResponseDto> findPlog(@PathVariable Long plogId) {
        Plogging plogging = plogService.findPlog(plogId);
        if (plogging == null) {
            return ResponseEntity.notFound().build();
        }
        PlogResponseDto plogResponseDto = plogMapper.ploggingToPlogResponseDto(plogging);
        return ResponseEntity.ok(plogResponseDto);
    }

    // 게시글 목록 조회
    @GetMapping
    public ResponseEntity<List<PlogResponseDto>> findPlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Plogging> plogPage = plogService.findPlogs(page, size);
        List<PlogResponseDto> plogResponseDtos = plogPage.getContent()
                .stream()
                .map(plogMapper::ploggingToPlogResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(plogResponseDtos);
    }

    // 게시글 수정
    @PatchMapping("/{plogId}")
    public ResponseEntity<PlogResponseDto> updatePlog(@PathVariable Long plogId, @RequestBody PlogPatchDto plogPatchDto) {
        Plogging updatedPlog = plogService.updatePlog(plogId, plogPatchDto);
        PlogResponseDto plogResponseDto = plogMapper.ploggingToPlogResponseDto(updatedPlog);
        return ResponseEntity.ok(plogResponseDto);
    }

    // 게시글 삭제
    @DeleteMapping("/{plogId}")
    public ResponseEntity<Void> deletePlog(@PathVariable Long plogId) {
        plogService.deletePlog(plogId);
        return ResponseEntity.noContent().build();
    }
}

