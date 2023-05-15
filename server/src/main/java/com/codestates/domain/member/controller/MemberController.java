package com.codestates.domain.member.controller;

import com.codestates.domain.member.dto.MemberPostDto;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.member.mapper.MemberMapper;
import com.codestates.domain.member.dto.MemberPatchDto;
import com.codestates.domain.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

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


}
