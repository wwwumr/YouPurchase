package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.CommodityClass;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 商品类别的repository接口
 *
 * @author Chuyuxuan
 */
public interface CommodityClassRepository extends CrudRepository<CommodityClass, Long> {

    CommodityClass getCommodityClassesByCommodityClassId(Long commodityClassId);

    CommodityClass getCommodityClassesByStoreIdAndClassInfo(Long storeId, String classInfo);

    List<CommodityClass> getCommodityClassesByStoreId(Long storeId);

    @Transactional
    @Modifying
    void deleteCommodityClassByCommodityClassId(Long commodityClassId);


}
