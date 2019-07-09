package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.parameter.CommodityParameter;

import java.util.List;

/**
 * 有关商品的service接口.
 *
 * @author Chuyuxuan
 */
public interface CommodityService {
    // 查看某个店铺的所有商品
    // 查看某一商品
    // 增加商品
    // 修改商品信息
    // 删除商品
    // 上架商品

    /**
     * 获取一个店铺的所有商品
     *
     * @param storeId 店铺id
     * @return 包含所有属于这个商店的商品信息列表
     */
    List<CommodityDTO> getAllCommoditiesByStore(Long storeId);

    /**
     * 通过一个商品的id找到商品信息
     *
     * @param commodityId 商品的id
     * @return 商品信息返回给前端，如果没有对应id返回null
     */
    CommodityDTO getCommodityById(Long commodityId);

    /**
     * 添加一个新商品.
     *
     * @param commodityParameter 前端发送的商品数据
     */
    void addACommodity(CommodityParameter commodityParameter);

    /**
     * 修改一个商品的信息.
     *
     * @param commodityParameter 前端发送的商品数据
     */
    void updateACommodity(CommodityParameter commodityParameter);
}
