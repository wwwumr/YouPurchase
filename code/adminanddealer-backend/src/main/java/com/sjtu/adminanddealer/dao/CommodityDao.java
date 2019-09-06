package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.entity.CommodityClass;

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

    /**
     * 数据库中持久化一个商品的信息.
     *
     * @param commodity 需要持久化的商品
     * @return 保存成功返回商品的id，返回-1表示失败
     */
    Long addCommodity(Commodity commodity, Long storeId);

    /**
     * 更新数据库中商品的信息.
     *
     * @param commodity 需要更新的商品信息
     */
    void updateCommodity(Commodity commodity);

    /**
     * 删除数据库中商品信息的记录.
     *
     * @param commodityId 商品id
     */
    void deleteCommodity(Long commodityId);

    /**
     * 修改商品的封面图片
     *
     * @param newCoverUrl 新图片的路径
     * @param commodityId 商品id
     */
    void updateCommodityCoverPic(String newCoverUrl, Long commodityId);

    /**
     * 通过id获取商品类别的信息
     *
     * @param commodityClassId 商品类别id
     * @return 对应的商品类别信息
     */
    CommodityClass getCommodityClassById(Long commodityClassId);

//    /**
//     * 获取一个店铺中所有的商品类别
//     *
//     * @param storeId 店铺id
//     * @return 对应店铺所有商品类别
//     */
//    List<CommodityClass> getCommodityClassesByStore(Long storeId);

    /**
     * 添加一个新的商品类别
     *
     * @param commodityClass 新的商品类别
     */
    void addNewCommodityClass(CommodityClass commodityClass);

    /**
     * 修改一个新的商品类别
     *
     * @param commodityClass 修改后的商品类别信息
     */
    void updateCommodityClass(CommodityClass commodityClass);

    /**
     * 删除一个商品类别
     *
     * @param commodityClassId 需要删除的商品类别id
     */
    void deleteCommodityClass(Long commodityClassId);

}
