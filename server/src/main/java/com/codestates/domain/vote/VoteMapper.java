package com.codestates.domain.vote;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VoteMapper {

    Vote createRequestToVote(VoteDto.CreateRequest createRequest);
    VoteDto.Response voteToResponseDto(Vote vote);
    List<VoteDto.Response> voteListToResponseDtoList(List<Vote> votes);


}

