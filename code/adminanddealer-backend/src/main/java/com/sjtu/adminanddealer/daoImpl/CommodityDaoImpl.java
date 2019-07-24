package com.sjtu.adminanddealer.daoImpl;

import com.sjtu.adminanddealer.dao.CommodityDao;
import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.entity.CommodityClass;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.repository.CommodityClassRepository;
import com.sjtu.adminanddealer.repository.CommodityRepository;
import com.sjtu.adminanddealer.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 数据访问层接口CommodityDao的实现类.
 *
 * @author Chuyuxuan
 */
@Repository
public class CommodityDaoImpl implements CommodityDao {

    @Autowired
    private CommodityRepository commodityRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private CommodityClassRepository commodityClassRepository;

    @Override
    public List<Commodity> getAllCommodityByStore(Long storeId) {
        Store store = storeRepository.findByStoreId(storeId);
        if (store != null) {
            return store.getCommodityList();
        }
        return null;
    }

    @Override
    public Commodity getCommodityById(Long commodityId) {
        return commodityRepository.getCommodityByCommodityId(commodityId);
    }

    @Override
    public Long addCommodity(Commodity commodity, Long storeId) {
        commodityRepository.saveAndFlush(commodity);
        Store store = storeRepository.findByStoreId(storeId);
        store.getCommodityList().add(commodity);
        storeRepository.saveAndFlush(store);
        return commodity.getCommodityId();
    }

    @Override
    public void updateCommodity(Commodity commodity) {
        commodityRepository.saveAndFlush(commodity);
    }

    @Override
    public void deleteCommodity(Long commodityId) {
        if (commodityRepository.existsById(commodityId)) {
            commodityRepository.deleteCommodityByCommodityId(commodityId);
        }
    }

    @Override
    public void updateCommodityCoverPic(String newCoverUrl, Long commodityId) {
        commodityRepository.updateCommodityCoverUrl(newCoverUrl, commodityId);
    }

    @Override
    public List<Commodity> getCommodityByClass(Long storeId, String classInfo) {
        return commodityRepository.getCommoditiesByCommodityClass_StoreIdAndCommodityClass_ClassInfo(storeId, classInfo);
    }

    @Override
    public CommodityClass getCommodityClassById(Long commodityClassId) {
        return commodityClassRepository.getCommodityClassesByCommodityClassId(commodityClassId);
    }

    @Override
    public List<CommodityClass> getCommodityClassesByStore(Long storeId) {
        return commodityClassRepository.getCommodityClassesByStoreId(storeId);
    }

    @Override
    public void addNewCommodityClass(CommodityClass commodityClass) {
        commodityClassRepository.save(commodityClass);
    }

    @Override
    public void updateCommodityClass(CommodityClass commodityClass) {
        commodityClassRepository.save(commodityClass);
    }

    @Override
    public void deleteCommodityClass(Long commodityClassId) {
        commodityClassRepository.deleteCommodityClassByCommodityClassId(commodityClassId);
    }
}
