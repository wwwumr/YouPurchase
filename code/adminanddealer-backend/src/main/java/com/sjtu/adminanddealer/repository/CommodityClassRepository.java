package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.CommodityClass;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * 商品类别的repository接口
 *
 * @author Chuyuxuan
 */
public interface CommodityClassRepository extends CrudRepository<CommodityClass, Long> {

    CommodityClass getCommodityClassesByCommodityClassId(Long commodityClassId);

    List<CommodityClass> getCommodityClassesByStoreId(Long storeId);

    void deleteCommodityClassByCommodityClassId(Long commodityClassId);


}
