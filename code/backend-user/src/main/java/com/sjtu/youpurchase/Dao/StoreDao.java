package com.sjtu.youpurchase.Dao;

import com.sjtu.youpurchase.entity.Store;

import java.util.List;

/**
 * 店铺相关信息的数据访问层接口.
 *
 * @author Chuyuxuan
 */
public interface StoreDao {

    /**
     * 获取所有的店铺实体类
     *
     * @return 包含所有店铺实体的列表
     */
    List<Store> getAllStores();

    /**
     * 通过店铺的id获取店铺实体
     * @param Id 店铺的id
     * @return 对应店铺id的实体
     */
    Store getStoreByStoreId(Long Id);

    /**
     * 持久化一个店铺实体
     * @param store 店铺信息
     */
    void addAStore(Store store);

    /**
     * 修改店铺实体的信息
     * @param store 店铺信息
     */
    void updateStore(Store store);

    // TODO: updateStoreCoverPic no implement
    void updateStoreCoverPic();
}
