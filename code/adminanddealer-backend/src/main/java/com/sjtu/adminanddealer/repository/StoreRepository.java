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

    // TODO: 这里的设计非常丑陋，主要是前期看错了参数，要修改一下
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

}
