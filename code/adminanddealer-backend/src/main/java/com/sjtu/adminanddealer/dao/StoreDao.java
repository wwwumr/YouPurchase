package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.entity.StoreTotalScore;

import java.util.List;

/**
 * 店铺相关信息的数据访问层接口.
 *
 * @author Chuyuxuan
 */
public interface StoreDao {

    /**
     * 获取所有的店铺实体类.
     *
     * @return 包含所有店铺实体的列表
     */
    List<Store> getAllStores();

    /**
     * 通过店铺的id获取店铺实体.
     *
     * @param Id 店铺的id
     * @return 对应店铺id的实体
     */
    Store getStoreByStoreId(Long Id);

    /**
     * 持久化一个店铺实体.
     *
     * @param store 店铺信息
     */
    Long addAStore(Store store);

    /**
     * 修改店铺实体的信息.
     *
     * @param store 店铺信息
     */
    void updateStore(Store store);

    /**
     * 删除一个店铺的信息.
     *
     * @param storeId 店铺id
     */
    void deleteStore(Long storeId);

    /**
     * 绑定经销商与店铺，将数据库中两条记录的attached设为true，然后把id设置为互相的id.
     *
     * @param dealerId 经销商id
     * @param storeId  店铺id
     */
    void bindDealerStore(Long dealerId, Long storeId);

    /**
     * 将经销商与店铺解除绑定，将数据库中两条记录的attached设为false，然后将id设置为null.
     *
     * @param dealerId 经销商id
     * @param storeId  店铺id
     */
    void unbindDealerStore(Long dealerId, Long storeId);

    /**
     * 获取所有未绑定经销商的店铺实体
     *
     * @return 包含所有未绑定店铺的列表
     */
    List<Store> getAllUnbindStore();

    /**
     * 将图片新的url写入数据库.
     *
     * @param storeId     店铺的id
     * @param coverPicUrl 新图片的url
     */
    void updateStoreCoverPic(Long storeId, String coverPicUrl);

    /**
     * 修改店铺的配送方式
     *
     * @param type    配送方式：0 默认自己配送 ；1：外部配送
     * @param storeId 店铺id
     */
    void updateStoreDeliveryType(Integer type, Long storeId);

    /**
     * 获取一个店铺近一个月的订单数
     *
     * @param storeId 店铺id
     * @return 店铺近一个月的订单数
     */
    Integer getStoreRecentSales(Long storeId);

    /**
     * 获取一个店铺的平均评分
     *
     * @param storeId 店铺id
     * @return 店铺的平均评分
     */
    double getStoreAvgScore(Long storeId);

    /**
     * 获取在一个经纬度范围内的店铺信息
     *
     * @param longitude1 经度1
     * @param longitude2 经度2
     * @param latitude1  纬度1
     * @param latitude2  纬度2
     * @return 所有范围内的店铺信息
     */
    List<Store> getStoresInRange(double longitude1, double longitude2, double latitude1, double latitude2);

    /**
     * 新建店铺时把总评分与评价次数也加入数据库
     *
     * @param storeTotalScore 新建的店铺评分信息
     * @return 评分的id
     */
    Long addStoreTotalScore(StoreTotalScore storeTotalScore);
}
