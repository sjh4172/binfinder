package com.codestates.domain.board.repository;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
