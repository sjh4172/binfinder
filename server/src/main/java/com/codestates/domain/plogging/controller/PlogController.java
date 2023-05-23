package com.codestates.domain.plogging.controller;

import com.codestates.domain.plogging.dto.PlogDetailDto;
import com.codestates.domain.plogging.dto.PlogPatchDto;
import com.codestates.domain.plogging.dto.PlogPostDto;
import com.codestates.domain.plogging.dto.PlogResponseDto;
import com.codestates.domain.plogging.entity.Plogging;
import com.codestates.domain.plogging.mapper.CustomMapper;
import com.codestates.domain.plogging.mapper.PlogMapper;
import com.codestates.domain.plogging.service.PlogService;
import com.codestates.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
    private final CustomMapper customMapper;
    public PlogController(PlogService plogService, PlogMapper plogMapper, CustomMapper customMapper) {
        this.plogService = plogService;
        this.plogMapper = plogMapper;
        this.customMapper = customMapper;
    }

    // 게시글 생성
    @PostMapping
    public ResponseEntity postPlog(@RequestBody PlogPostDto plogPostDto) {
        Plogging plogging = plogService.createPlog (plogMapper.plogPostDtoToPlogging(plogPostDto));
        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/plogs/"+ plogging.getP_id())
                .build().toUri();

        return ResponseEntity.created(uri).build();
    }


    // 게시글 상세 조회
    @GetMapping("/{p_id}")
    public ResponseEntity findPlog(@PathVariable("p_id") Long p_id) {
        Plogging plogging = plogService.findPlog(p_id);
        if (plogging == null) {
            return ResponseEntity.notFound().build();
        }
        PlogDetailDto plogDetailDto = customMapper.ploggingToPlogDetailDto(plogging);
        return ResponseEntity.ok(plogDetailDto);
    }

    // 게시글 목록 조회
    @GetMapping
    public ResponseEntity findPlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<Plogging> plogPage = plogService.findPlogs(page, size);
        List<PlogResponseDto> response = plogPage.getContent()
                .stream()
                .map(plogMapper::ploggingToPlogResponseDto)
                .collect(Collectors.toList());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Pages", String.valueOf(plogService.getTotalPages(size)));
        return ResponseEntity.ok()
                .headers(headers)
                .body(response);

    }

    // 게시글 수정
    @PatchMapping("/{p_id}")
    public ResponseEntity patchPlog(@PathVariable("p_id") Long p_id, @RequestBody PlogPatchDto plogPatchDto) {
        plogPatchDto.setP_id(p_id);
        Plogging plogging = plogMapper.plogPatchDtoToPlogging(plogPatchDto);
        Plogging updatedPlog = plogService.updatePlog(plogging);
        PlogResponseDto plogResponseDto = plogMapper.ploggingToPlogResponseDto(updatedPlog);
        return ResponseEntity.ok(plogResponseDto);
    }
    // 게시글 삭제
    @DeleteMapping("/{p_id}")
    public ResponseEntity deletePlog(@PathVariable("p_id") Long p_id) {
        plogService.deletePlog(p_id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/like/{p_id}/{m_id}")
    public ResponseEntity postLike(@PathVariable("p_id") long p_id, @PathVariable("m_id") long m_id) {
        Plogging response = plogService.like(p_id, m_id);

        return new ResponseEntity<>(plogMapper.ploggingToPlogResponseDto(response), HttpStatus.OK);
    }
    @PostMapping("/unlike/{p_id}/{m_id}")
    public ResponseEntity deleteLike(@PathVariable("p_id") long p_id, @PathVariable("m_id") long m_id) {
        Plogging response = plogService.unLike(p_id, m_id);

        return new ResponseEntity<>(plogMapper.ploggingToPlogResponseDto(response), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity handleException(MethodArgumentNotValidException e) {
        // (1)
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

        // (2)
        List<ErrorResponse.FieldError> errors =
                fieldErrors.stream()
                        .map(error -> new ErrorResponse.FieldError(
                                error.getField(),
                                error.getRejectedValue(),
                                error.getDefaultMessage()))
                        .collect(Collectors.toList());

//		return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
        return ResponseEntity.badRequest().body(ErrorResponse.of(e.getBindingResult()));
    }
}

