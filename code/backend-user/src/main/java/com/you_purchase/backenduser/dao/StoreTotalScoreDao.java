package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.StoreTotalScore;
import org.springframework.data.repository.CrudRepository;

public interface StoreTotalScoreDao extends CrudRepository<StoreTotalScore, Long> {

    public StoreTotalScore findByStoreId(Long storeId);
}
