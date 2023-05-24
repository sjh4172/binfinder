package com.codestates.domain.board.repository;

import com.codestates.domain.board.entity.Board;
import com.codestates.domain.member.entity.Member;
import com.codestates.domain.plogging.entity.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	@Query("SELECT b FROM Board b LEFT JOIN FETCH b.comments c WHERE b.b_id = :b_id")
	Optional<Board> findBoardWithComments(@Param("b_id") Long b_id);
}
