package com.sjtu.youpurchase.daoImpl;

import com.google.common.collect.Lists;
import com.sjtu.youpurchase.Dao.StoreDao;
import com.sjtu.youpurchase.entity.Store;
import com.sjtu.youpurchase.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
        storeRepository.save(store);
    }

    @Override
    public void updateStoreCoverPic() {

    }
}
