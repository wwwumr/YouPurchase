package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Commodity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Chuyuxuan
 */
public interface CommodityRepository extends JpaRepository<Commodity, Long> {

    Commodity getCommodityByCommodityId(Long commodityId);
}
