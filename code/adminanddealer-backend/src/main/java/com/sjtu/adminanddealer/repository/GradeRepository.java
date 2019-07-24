package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Grade;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Chuyuxuan
 */
public interface GradeRepository extends CrudRepository<Grade, Long> {

    @Transactional
    @Query(value = "select avg(score) as avg_score from grade where store_id = :storeId", nativeQuery = true)
    Object getStoreAvgScore(@Param("storeId") Long storeId);
}
