package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Store;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface StoreDao extends CrudRepository<Store,String> {
    public Store findByStoreId(long storeId);

    @Query(value = "select store_id from store_commodity where commodity_id = :commodity_id",nativeQuery = true)
    long getStoreIdByCommdoity(@Param("commodity_id")long commodityId);
}
