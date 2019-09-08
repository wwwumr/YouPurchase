package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Commodity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Chuyuxuan
 */
@Transactional
public interface CommodityRepository extends JpaRepository<Commodity, Long> {

    Commodity getCommodityByCommodityId(Long commodityId);

    void deleteCommodityByCommodityId(Long commodityId);

    @Modifying
    @Query(value = "update `commodity` set `commodity_cover_pic_url`=:coverPicUrl " +
            "where `commodity_id`=:commodityId ", nativeQuery = true)
    void updateCommodityCoverUrl(@Param("coverPicUrl") String newUrl, @Param("commodityId") Long comodityId);


    @Query(value = "select store_id from store_commodity where commodity_id = :commodity_id", nativeQuery = true)
    Long getStoreIdByCommdoity(@Param("commodity_id") Long commodityId);
}
