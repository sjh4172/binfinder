package com.codestates.domain.member.controller;

import com.codestates.domain.member.dto.MemberPostDto;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.mapper.MemberMapper;
import com.codestates.domain.member.dto.MemberPatchDto;
import com.codestates.domain.member.service.MemberService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ErrorResponse;
import com.codestates.exception.ExceptionCode;
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
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto requestBody) {
        try {
            Member member = memberService.createMember(mapper.memberPostDtoToMember(requestBody));

            URI uri = UriComponentsBuilder.newInstance()
                    .path("/api/members/" + member.getMemberId())
                    .build().toUri();

            log.info("##uri 주소는 다음과 같습니다:{} ##", uri);

            return ResponseEntity.created(uri).build();

        } catch (BusinessLogicException ex) {
            ErrorResponse errorResponse;
            if (ex.getExceptionCode() == ExceptionCode.MEMBER_EXISTS) {
                errorResponse = ErrorResponse.of(ExceptionCode.MEMBER_EXISTS);
            } else if (ex.getExceptionCode() == ExceptionCode.USERNAME_EXISTS) {
                errorResponse = ErrorResponse.of(ExceptionCode.USERNAME_EXISTS);
            } else {
                // Handle other exceptions if needed
                errorResponse = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
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
        try {
            Member member = memberService.findMember(memberId);

            return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(null,HttpStatus.NO_CONTENT);
        }
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
