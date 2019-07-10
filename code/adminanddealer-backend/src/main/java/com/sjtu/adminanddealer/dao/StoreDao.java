package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Store;

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
    void addAStore(Store store);

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
     * 将图片新的url写入数据库.
     *
     * @param storeId     店铺的id
     * @param coverPicUrl 新图片的url
     */
    void updateStoreCoverPic(Long storeId, String coverPicUrl);
}
