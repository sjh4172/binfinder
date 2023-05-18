package com.codestates.domain.board.mapper;

import com.codestates.domain.board.dto.BoardDto;
import com.codestates.domain.board.entity.Board;
import com.codestates.domain.plogging.dto.PlogDetailDto;
import com.codestates.domain.plogging.entity.Plogging;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {
	Board boardPostDtoToBoard(BoardDto.Post postDto);
	Board boardPatchDtoToBoard(BoardDto.Patch patchDto);
	BoardDto.Response boardToBoardResponseDto(Board board);

	BoardDto.Detail BoardToDetailDto(Board board);

}
