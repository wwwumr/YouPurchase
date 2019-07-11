package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Commodity;

import java.util.List;

/**
 * 商品信息的数据访问层.
 *
 * @author Chuyuxuan
 */
public interface CommodityDao {

    /**
     * 获取一个店铺中的所有商品
     *
     * @param storeId 店铺id
     * @return 该店铺中包含所有商品的列表
     */
    List<Commodity> getAllCommodityByStore(Long storeId);

    /**
     * 通过商品的id获取商品的实体类
     *
     * @param commodityId 商品的id
     * @return 对应id的商品实体，没有对应id则返回null
     */
    Commodity getCommodityById(Long commodityId);
}
