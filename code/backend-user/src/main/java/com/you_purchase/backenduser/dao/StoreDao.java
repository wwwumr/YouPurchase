package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Store;
import org.springframework.data.repository.CrudRepository;

public interface StoreDao extends CrudRepository<Store,String> {
    public Store findByStoreId(long storeId);
}
