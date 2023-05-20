package com.codestates.domain.member.mapper;

import com.codestates.domain.member.dto.MemberPostDto;
import com.codestates.domain.member.dto.MemberResponseDto;
import com.codestates.domain.member.dto.MemberPatchDto;
import com.codestates.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberPatchDtoToMember(MemberPatchDto memberDto);
    Member memberPostDtoToMember(MemberPostDto memberDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
    List<MemberResponseDto> memberToMemberResponseDtos(List<Member> members);
}