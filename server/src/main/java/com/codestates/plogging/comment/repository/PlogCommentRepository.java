package com. codestates.plogging.comment.repository;
import com.codestates.plogging.comment.entity.PlogComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlogCommentRepository extends JpaRepository<PlogComment,Long> {
}
