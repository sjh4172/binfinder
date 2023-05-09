package com.codestates.trashcan;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TrashCanMapper {
    TrashCan createRequestToTrashCan(TrashCanDto.CreateRequest createRequest);
    TrashCan updateRequestToTrashCan(TrashCanDto.UpdateRequest updateRequest);
    TrashCanDto.Response trashCanToResponseDto(TrashCan trashCan);

    List<TrashCanDto.Response> trashCanListToResponseDtoList(List<TrashCan> trashCans);

}

