package com.sjtu.adminanddealer.daoImpl;

import com.google.common.collect.Lists;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * StoreDao的实现类.
 *
 * @author Chuyuxuan
 */
@Repository
public class StoreDaoImpl implements StoreDao {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Store> getAllStores() {
        /*使用Google的库直接把Iterable类转化为List*/
        return Lists.newArrayList(storeRepository.findAll());
    }

    @Override
    public Store getStoreByStoreId(Long Id) {
        return storeRepository.findByStoreId(Id);
    }

    @Override
    public void addAStore(Store store) {
        storeRepository.save(store);
    }

    @Override
    public void updateStore(Store store) {
        storeRepository.saveAndFlush(store);
    }

    @Transactional(rollbackFor = {RuntimeException.class})
    @Override
    public void bindDealerStore(Long dealerId, Long storeId) {
        storeRepository.bindDealerAndStoreStep1(dealerId, storeId, true);
        storeRepository.bindDealerAndStoreStep2(dealerId, storeId, true);
    }

    @Transactional(rollbackFor = {RuntimeException.class})
    @Override
    public void unbindDealerStore(Long dealerId, Long storeId) {
        storeRepository.unbindDealerAndStoreStep1(dealerId, false);
        storeRepository.unbindDealerAndStoreStep2(storeId, false);
    }

    @Override
    public void updateStoreCoverPic(Long storeId, String coverPicUrl) {
        storeRepository.updateStorePicUrl(storeId, coverPicUrl);
    }
}
