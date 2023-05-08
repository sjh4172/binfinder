package com.codestates.plogging.repository;

import com.codestates.plogging.entity.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlogRepository extends JpaRepository<Plogging,Long> {
}
