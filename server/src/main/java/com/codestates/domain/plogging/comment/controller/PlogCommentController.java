package com.codestates.domain.plogging.comment.controller;

import com.codestates.domain.plogging.comment.dto.PlogCommentPatchDto;
import com.codestates.domain.plogging.comment.dto.PlogCommentPostDto;
import com.codestates.domain.plogging.comment.dto.PlogCommentResponseDto;
import com.codestates.domain.plogging.comment.entity.PlogComment;
import com.codestates.domain.plogging.comment.mapper.PlogCommentMapper;
import com.codestates.domain.plogging.comment.service.PlogCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/pcomments")
public class PlogCommentController {
    private PlogCommentMapper mapper;
    private PlogCommentService plogCommentService;
    @Autowired
    public PlogCommentController(PlogCommentMapper mapper, PlogCommentService plogCommentService) {
        this.mapper = mapper;
        this.plogCommentService = plogCommentService;
    }
    @PostMapping("/{plogId}")
    public ResponseEntity postPlogComment(@PathVariable Long plogId, @RequestBody PlogCommentPostDto commentPostDto){
        PlogComment plogComment = plogCommentService.createPlogComment(plogId, mapper.plogCommentPostDtoToPlogComment(commentPostDto));
        URI uri = UriComponentsBuilder.newInstance().path("/api/pcomments"+plogComment.getPlogCommentId())
                .build().toUri();
        return ResponseEntity.created(uri).build();
    }
    @PatchMapping("/{pcId}")
    public ResponseEntity patchPlogComment(@RequestBody PlogCommentPatchDto requestBody,
                                           @PathVariable("pcId") long pcId){
        requestBody.setPlogCommentId(pcId);
        PlogComment plogComment = mapper.plogCommentPatchDtoToPlogComment(requestBody);
        PlogComment response = plogCommentService.updatePlogComment(plogComment);
        return new ResponseEntity<>(mapper.plogCommentToPlogResponseDto(response), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getPlogComments(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size){
        Page<PlogComment> plogComments = plogCommentService.findPlogComments(page,size);
        List<PlogCommentResponseDto> responses =
                plogComments.stream()
                        .map(plogComment -> mapper.plogCommentToPlogResponseDto(plogComment))
                        .collect(Collectors.toList());
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }
    @DeleteMapping("/{pcId}")
    public ResponseEntity deletePlogComment(@PathVariable("pcId") long pcId){
        plogCommentService.deletePlogComment(pcId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
