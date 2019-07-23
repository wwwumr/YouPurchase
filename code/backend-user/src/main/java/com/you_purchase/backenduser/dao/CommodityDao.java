package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Commodity;
import org.springframework.data.repository.CrudRepository;

public interface CommodityDao extends CrudRepository<Commodity,String> {
    public Commodity findByCommodityId(long commodityId);
}
