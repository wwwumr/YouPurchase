package com.sjtu.youpurchase.dao;

import com.sjtu.youpurchase.entity.Store;

import java.util.List;

/**
 * 店铺相关信息的数据访问层接口.
 * @author Chuyuxuan
 */
public interface StoreDao {

    /**
     * 获取所有的店铺实体类
     * @return 包含所有店铺实体的列表
     */
    List<Store> getAllStores();
}
