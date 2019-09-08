package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Commodity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface CommodityDao extends CrudRepository<Commodity,String> {

    public Commodity findByCommodityId(long commodityId);

    public Commodity getCommodityByCommodityId(Long commodityId);


    @Query(value = "select * from commodity where commodity_class = :commodity_class ORDER BY rand() limit 1",nativeQuery = true)
    Commodity getCommodity(@Param("commodity_class")String commodityClass);



}
