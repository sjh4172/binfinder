package com.codestates.board.mapper;

import com.codestates.board.dto.BoardDto;
import com.codestates.board.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {
	Board boardPostDtoToBoard(BoardDto.Post postDto);
	Board boardPatchDtoToBoard(BoardDto.Patch patchDto);
	BoardDto.Response boardToBoardResponseDto(Board board);
}
