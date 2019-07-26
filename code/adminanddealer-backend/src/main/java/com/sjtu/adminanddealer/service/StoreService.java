package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DistanceSortedStoreDTO;
import com.sjtu.adminanddealer.DTO.GradeSortedStoreDTO;
import com.sjtu.adminanddealer.DTO.SalesSortedStoreDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.StoreAddressParameter;
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
     * 根据距离测算，把在配送范围内的店铺按距离排序
     *
     * @param userLatitude  用户所在的坐标：经度
     * @param userLongitude 用户所在的坐标：纬度
     * @return 所需要的以距离升序的列表
     */
    List<DistanceSortedStoreDTO> getStoresByDistance(double userLongitude, double userLatitude);

    /**
     * 根据最近的销量把在配送范围内的店铺降序排序
     *
     * @param userLatitude  用户所在的坐标：经度
     * @param userLongitude 用户所在的坐标：纬度
     * @return 以销量降序排序的店铺信息
     */
    List<SalesSortedStoreDTO> getStoresBySales(double userLongitude, double userLatitude);

    /**
     * 根据评价来对配送范围内的店铺排序
     *
     * @param userLatitude  用户所在的坐标：经度
     * @param userLongitude 用户所在的坐标：纬度
     * @return 以评价排序的店铺信息
     */
    List<GradeSortedStoreDTO> getStoreByScore(double userLongitude, double userLatitude);

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
     * 删除一个店铺的信息.
     *
     * @param storeId 店铺id
     */
    void deleteStore(Long storeId);

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
     * 获取所有没有绑定的店铺.
     *
     * @return 所有未绑定的店铺
     */
    List<StoreDTO> getAllUnbindStore();

    /**
     * 更新店铺的封面图片，调用者为经销商或管理员.
     *
     * @return 新图片的路径
     */
    String updateStoreCoverPic(MultipartFile file, Long storeId, String coverPicUrl);

    /**
     * 修改店铺的配送方式
     *
     * @param type    配送方式，0代表自己配送；1代表外部配送（蜂鸟）
     * @param storeId 店铺id
     */
    void updateStoreDeliveryType(Integer type, Long storeId);

    /**
     * 修改店铺的地址
     *
     * @param parameter 前端传来的参数
     * @param storeId   店铺id
     */
    void updateStoreAddress(StoreAddressParameter parameter, Long storeId);
}
