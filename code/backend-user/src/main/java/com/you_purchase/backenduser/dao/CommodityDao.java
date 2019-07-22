package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Commodity;
import org.springframework.data.repository.CrudRepository;

/**
 * 商品类的dao层
 *
 * @author Chuyuxuan
 */
public interface CommodityDao extends CrudRepository<Commodity, Long> {

    Commodity getCommodityByCommodityId(Long commodityId);
}
