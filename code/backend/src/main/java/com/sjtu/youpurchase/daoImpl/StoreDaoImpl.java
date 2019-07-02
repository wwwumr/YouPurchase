package com.sjtu.youpurchase.daoImpl;

import com.google.common.collect.Lists;
import com.sjtu.youpurchase.dao.StoreDao;
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
}
