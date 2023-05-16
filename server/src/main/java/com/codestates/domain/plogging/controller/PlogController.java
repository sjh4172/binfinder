package com.codestates.domain.plogging.controller;

import com.codestates.domain.plogging.dto.PlogDetailDto;
import com.codestates.domain.plogging.dto.PlogPatchDto;
import com.codestates.domain.plogging.dto.PlogPostDto;
import com.codestates.domain.plogging.dto.PlogResponseDto;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.domain.plogging.mapper.PlogMapper;
import com.codestates.domain.plogging.service.PlogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/plogs")
@Slf4j
@CrossOrigin(origins = "*")
public class PlogController {

    private final PlogService plogService;
    private final PlogMapper plogMapper;

    public PlogController(PlogService plogService, PlogMapper plogMapper) {
        this.plogService = plogService;
        this.plogMapper = plogMapper;
    }

    // 게시글 생성
    @PostMapping
    public ResponseEntity postPlog(@RequestBody PlogPostDto plogPostDto) {
        Plogging plogging = plogService.createPlog (plogMapper.plogPostDtoToPlogging(plogPostDto));
        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/plogs/"+ plogging.getPlogId())
                .build().toUri();

        return ResponseEntity.created(uri).build();
    }


    // 게시글 상세 조회
    @GetMapping("/{plogId}")
    public ResponseEntity findPlog(@PathVariable("plogId") Long plogId) {
        Plogging plogging = plogService.findPlog(plogId);
        if (plogging == null) {
            return ResponseEntity.notFound().build();
        }
        PlogDetailDto plogDetailDto = plogMapper.ploggingToPlogDetailDto(plogging);
        return ResponseEntity.ok(plogDetailDto);
    }

    // 게시글 목록 조회
    @GetMapping
    public ResponseEntity findPlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Plogging> plogPage = plogService.findPlogs(page, size);
        List<PlogResponseDto> plogResponseDtoList = plogPage.getContent()
                .stream()
                .map(plogMapper::ploggingToPlogResponseDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(plogResponseDtoList);
    }

    // 게시글 수정
    @PatchMapping("/{plogId}")
    public ResponseEntity patchPlog(@PathVariable("plogId") Long plogId, @RequestBody PlogPatchDto plogPatchDto) {
        plogPatchDto.setPlogId(plogId);
        Plogging plogging = plogMapper.plogPatchDtoToPlogging(plogPatchDto);
        Plogging updatedPlog = plogService.updatePlog(plogging);
        PlogResponseDto plogResponseDto = plogMapper.ploggingToPlogResponseDto(updatedPlog);
        return ResponseEntity.ok(plogResponseDto);
    }
    // 게시글 삭제
    @DeleteMapping("/{plogId}")
    public ResponseEntity deletePlog(@PathVariable("plogId") Long plogId) {
        plogService.deletePlog(plogId);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/like/{plogId}/{memberId}")
    public ResponseEntity postLike(@PathVariable("plogId") long plogId, @PathVariable("memberId") long memberId) {
        Plogging response = plogService.like(plogId, memberId);

        return new ResponseEntity<>(plogMapper.ploggingToPlogResponseDto(response), HttpStatus.OK);
    }
    @PostMapping("/unlike/{plogId}/{memberId}")
    public ResponseEntity deleteLike(@PathVariable("plogId") long plogId, @PathVariable("memberId") long memberId) {
        Plogging response = plogService.unLike(plogId, memberId);

        return new ResponseEntity<>(plogMapper.ploggingToPlogResponseDto(response), HttpStatus.OK);
    }
}

