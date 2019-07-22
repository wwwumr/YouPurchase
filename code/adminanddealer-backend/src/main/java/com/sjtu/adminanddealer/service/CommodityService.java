package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.DTO.CommodityShortageDTO;
import com.sjtu.adminanddealer.parameter.CommodityCheckParameter;
import com.sjtu.adminanddealer.parameter.CommodityParameter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 有关商品的service接口.
 *
 * @author Chuyuxuan
 */
public interface CommodityService {
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
     * @return JSON格式 {"key":新建商品的id(Long), "coverPicUrl":String}
     */
    JSONObject addACommodity(CommodityParameter commodityParameter, Long storeId);

    /**
     * 修改一个商品的信息.
     *
     * @param commodityParameter 前端发送的商品数据
     */
    void updateACommodity(CommodityParameter commodityParameter);

    /**
     * 通过商品的id删除商品
     *
     * @param commodityId 商品id
     */
    void deleteCommodity(Long commodityId);

    /**
     * 删除一个列表的商品
     *
     * @param commodityIds 商品的id
     * @param storeId      session中存放的店铺id，需要从该店铺中把相应商品删除
     */
    void deleteCommodities(List<Long> commodityIds, Long storeId);

    /**
     * 检查商品的库存
     *
     * @param checkParameterList 需要进行检查的商品
     * @return 如果所有商品都满足库存放回空列表，否则加入对应的CommodityShortageDTO
     */
    List<CommodityShortageDTO> checkCommodityRemaining(List<CommodityCheckParameter> checkParameterList);

    List<CommodityShortageDTO> decreaseCommodityInventory(List<CommodityCheckParameter> commodityList);

    String updateCommodityCoverPic(MultipartFile file, Long commodityId, String coverPicUrl);

    String addCommodityPics(MultipartFile file, Long commodityId);

}
