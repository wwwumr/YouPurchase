package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Chuyuxuan
 */
@Transactional
public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreId(Long Id);

    @Modifying
    @Query(value = "update `dealer` set `attached` = :unbind, `store_id` = null where `dealer_id` = :dealer_id ", nativeQuery = true)
    void unbindDealerAndStoreStep1(@Param("dealer_id") Long dealerId, @Param("unbind") boolean unbind);

    @Modifying
    @Query(value = "update `store` set `attached` = :unbind, `dealer_id` = null where `store_id` = :store_id ", nativeQuery = true)
    void unbindDealerAndStoreStep2(@Param("store_id") Long storeId, @Param("unbind") boolean unbind);

    @Modifying
    @Query(value = "update `dealer` set `attached` = :bind, `store_id` = :store_id where `dealer_id` = :dealer_id ", nativeQuery = true)
    void bindDealerAndStoreStep1(@Param("dealer_id") Long dealerId, @Param("store_id") Long storeId, @Param("bind") boolean bind);

    @Modifying
    @Query(value = "update `store` set `attached` = :bind, `dealer_id` = :dealer_id where `store_id` = :store_id ", nativeQuery = true)
    void bindDealerAndStoreStep2(@Param("dealer_id") Long dealerId, @Param("store_id") Long storeId, @Param("bind") boolean bind);

    List<Store> getStoresByAttachedIsFalse();

    @Modifying
    @Query(value = "update `store` set `cover_pic_url` = :coverPicUrl where `store_id` = :storeId ", nativeQuery = true)
    void updateStorePicUrl(@Param("storeId") Long storeId, @Param("coverPicUrl") String coverPicUrl);

    void deleteStoreByStoreId(Long storeId);

    @Modifying
    @Query(value = "update `store` set `delivery_type` = :deliveryType where `store_id` = :storeId", nativeQuery = true)
    void updateStoreDelivery(@Param("deliveryType") Integer type, @Param("storeId") Long storeId);

    List<Store> getStoresByLongitudeBetweenAndLatitudeBetween(double longitude1, double longitude2, double latitude1, double latitude2);
}
