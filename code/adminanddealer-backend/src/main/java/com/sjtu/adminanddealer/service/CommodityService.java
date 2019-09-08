package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.DTO.CommodityShortageDTO;
import com.sjtu.adminanddealer.entity.CommodityClass;
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

    /**
     * 获取一个店铺的所有商品
     *
     * @param storeId 店铺id
     * @return 包含所有属于这个商店的商品信息列表
     */
    List<CommodityDTO> getAllCommoditiesByStore(Long storeId);

    /**
     * 获取一个店铺里所有上架的商品
     *
     * @param storeId 店铺id
     * @return 包含所有属于这个商店的商品信息列表
     */
    List<CommodityDTO> getAllCommoditiesByStoreOnShelves(Long storeId);

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
     * @param storeId            店铺id
     * @return JSON格式 {"key":新建商品的id(Long), "coverPicUrl":String}
     */
    JSONObject addACommodity(CommodityParameter commodityParameter, Long storeId);

    /**
     * 添加酒类的新商品
     * 设置商品的类别为酒
     *
     * @param commodityParameter 前端发送的商品数据
     * @param storeId            店铺id
     * @return JSON格式 {"key":新建商品的id(Long), "coverPicUrl":String}
     */
    JSONObject addAlcohol(CommodityParameter commodityParameter, Long storeId);

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

    /**
     * 下订单后减少商品的库存
     *
     * @param commodityList 需要减少库存的商品
     * @return 如果每个商品的余量都充足，返回一个空的列表；如果有余量不足的，返回该商品的id和实际余量
     */
    List<CommodityShortageDTO> decreaseCommodityInventory(List<CommodityCheckParameter> commodityList);

    /**
     * 更新商品的封面图片
     *
     * @param file        新封面图片
     * @param commodityId 商品id
     * @param coverPicUrl 原来的图片在数据库中的保存字段
     * @return 返回新的图片在数据库中保存的字段
     */
    String updateCommodityCoverPic(MultipartFile file, Long commodityId, String coverPicUrl);

    /**
     * 添加商品的其他描述图片
     *
     * @param file        新添加的图片
     * @param commodityId 商品id
     * @return 新的图片在数据库中的字段
     */
    String addCommodityPics(MultipartFile file, Long commodityId);


    /**
     * 获取一个店铺中所有的商品类别
     *
     * @param storeId 店铺id
     * @return 该店铺中所有商品类别信息
     */
    List<String> getCommodityClassInStore(Long storeId);

    /**
     * 管理员新增商品类别
     *
     * @param classInfo 新增的商品类别信息
     * @return 新建商品类别的id
     */
    Long addNewCommodityClass(String classInfo);

    /**
     * 修改商品类别的信息
     *
     * @param commodityClassId 商品类别id
     * @param newClassInfo     新的商品类别信息
     */
    void updateCommodityClass(Long commodityClassId, String newClassInfo);

    /**
     * 删除商品类别信息
     *
     * @param commodityClassId 商品类别id
     */
    void deleteCommodityClass(Long commodityClassId);

    List<CommodityClass> getAllCommodityClass();
}
