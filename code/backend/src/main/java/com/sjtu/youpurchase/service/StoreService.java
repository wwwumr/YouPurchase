package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.StoreDTO;

import java.util.List;

/**
 * 店铺相关的服务层接口.
 *
 * @author Chuyuxuan
 */
public interface StoreService {

    /**
     * 获取全部的店铺信息,可以直接把数据发送到前端.
     *
     * @return 包含所有storeDTO的列表
     */
    List<StoreDTO> getAllStores();
}
