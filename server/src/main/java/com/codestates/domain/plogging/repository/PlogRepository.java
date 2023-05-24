package com.codestates.domain.plogging.repository;

import com.codestates.domain.plogging.entity.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlogRepository extends JpaRepository<Plogging,Long> {
    @Query("SELECT p FROM Plogging p LEFT JOIN FETCH p.p_comments WHERE p.p_id = :p_id")
    Optional<Plogging> findPlogWithComments(@Param("p_id") Long p_id);

}
