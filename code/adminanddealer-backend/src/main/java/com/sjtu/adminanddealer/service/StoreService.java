package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import org.springframework.web.multipart.MultipartFile;

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
     * 通过店铺的id获取店铺信息
     *
     * @param storeId 店铺id
     * @return 对应id的店铺信息, 如果没有对应id返回一个空的StoreDTO
     */
    StoreDTO getStoreByStoreId(Long storeId);

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
     * 获取所有未绑定的经销商
     *
     * @return 所有未绑定的经销商的信息
     */
    List<DealerDTO> getAllUnbindDealers();

    /**
     * 更新店铺的封面图片，调用者为经销商或管理员.
     *
     * @return 新图片的路径
     */
    String updateStoreCoverPic(MultipartFile file, Long storeId, String coverPicUrl);
}
