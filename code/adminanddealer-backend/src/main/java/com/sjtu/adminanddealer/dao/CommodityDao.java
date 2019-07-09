package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Commodity;

import java.util.List;

/**
 * 商品信息的数据访问层.
 *
 * @author Chuyuxuan
 */
public interface CommodityDao {

    List<Commodity> getAllCommodityByStore(Long storeId);

    Commodity getCommodityById(Long commodityId);
}
