package com.codestates.member.controller;

import com.codestates.exception.ErrorResponse;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.entity.Member;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")
@Validated
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto requestBody){
        Member member = memberService.createMember(mapper.memberPostDtoToMember(requestBody));

        URI uri = UriComponentsBuilder.newInstance()
                .path("/api/members/" + member.getMemberId())
                .build().toUri();

        log.info("##uri 주소는 다음과 같습니다:{} ##", uri);

        return ResponseEntity.created(uri).build();
    }
    @PatchMapping("/{memberId}")
    public ResponseEntity patchMember(@PathVariable @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);

    }
    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@PathVariable @Positive long memberId) {
        Member member = memberService.findMember(memberId);

        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getMembers() {
        List<Member> members = memberService.findMembers();

        return new ResponseEntity(mapper.memberToMemberResponseDtos(members), HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteMember(@PathVariable @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    // 에러 정보 응답을 위한 메서드
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

        return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
    }


}
