package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.StoreParameter;

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

    /**
     * 添加一个店铺，数据从前端发送，调用者为管理员
     *
     * @param storeParameter 前端发送的店铺信息
     * @return JSON，格式为{"key" : long, "coverUrl" : String}
     */
    JSONObject addAStore(StoreParameter storeParameter);

    /**
     * 更新店铺的信息(不包括店铺封面图片)，数据从前端发送，调用者为管理员或者相应的经销商
     *
     * @param storeParameter 前端发送的信息
     */
    void updateStore(StoreParameter storeParameter);

    /**
     * 把店铺与经销商解除绑定(取消对经销商的授权).
     *
     * @param storeId  店铺id
     * @param dealerId 经销商id
     */
    void unbindDealerAndStore(Long dealerId, Long storeId);

    /**
     * 把店铺与经销商绑定，写实现时注意验证经销商是取消绑定的.
     *
     * @param dealerId 经销商id
     * @param storeId  店铺id
     */
    void bindDealerAndStore(Long dealerId, Long storeId);

    /**
     * 更新店铺的封面图片，调用者为经销商
     * TODO: updateStoreCoverPic no implement
     */
    void updateStoreCoverPic();
}
