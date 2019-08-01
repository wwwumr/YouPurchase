package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.StoreTotalScore;
import org.springframework.data.repository.CrudRepository;

public interface StoreTotalScoreRepository extends CrudRepository<StoreTotalScore, Long> {

    StoreTotalScore getByStoreId(Long storeId);
}
