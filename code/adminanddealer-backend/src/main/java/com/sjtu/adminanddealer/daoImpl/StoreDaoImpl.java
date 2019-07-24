package com.sjtu.adminanddealer.daoImpl;

import com.google.common.collect.Lists;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.OrderInfo;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.repository.GradeRepository;
import com.sjtu.adminanddealer.repository.OrderInfoRepository;
import com.sjtu.adminanddealer.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
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

    @Autowired
    private OrderInfoRepository orderInfoRepository;

    @Autowired
    private GradeRepository gradeRepository;

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
    public Long addAStore(Store store) {
        storeRepository.saveAndFlush(store);
        return store.getStoreId();
    }

    @Override
    public void updateStore(Store store) {
        storeRepository.saveAndFlush(store);
    }

    @Override
    public void deleteStore(Long storeId) {
        if (storeRepository.existsById(storeId)) {
            storeRepository.deleteStoreByStoreId(storeId);
        }
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
    public List<Store> getAllUnbindStore() {
        return storeRepository.getStoresByAttachedIsFalse();
    }

    @Override
    public void updateStoreCoverPic(Long storeId, String coverPicUrl) {
        storeRepository.updateStorePicUrl(storeId, coverPicUrl);
    }

    @Override
    public void updateStoreDeliveryType(Integer type, Long storeId) {
        if (storeRepository.existsById(storeId)) {
            storeRepository.updateStoreDelivery(type, storeId);
        }
    }

    @Override
    public Integer getStoreRecentSales(Long storeId) {
        Calendar rightNow = Calendar.getInstance();

        // 当前的日期
        Date end = rightNow.getTime();
        rightNow.add(Calendar.MONTH, -1);

        // 一个月之前的日期
        Date start = rightNow.getTime();
        List<OrderInfo> orderInfos = orderInfoRepository.getOrderInfosByStoreIdAndCreateDateBetween(storeId, start, end);
        return orderInfos.size();
    }

    @Override
    public double getStoreAvgScore(Long storeId) {
        Object o = gradeRepository.getStoreAvgScore(storeId);
        System.out.println(o);
        if (o == null) {
            return 0;
        }
        return (double) o;
    }
}
