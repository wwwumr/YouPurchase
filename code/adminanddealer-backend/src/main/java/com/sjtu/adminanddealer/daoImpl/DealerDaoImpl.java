package com.sjtu.adminanddealer.daoImpl;

import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.repository.DealerRepository;
import com.sjtu.adminanddealer.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * DealDao的实现类
 *
 * @author Chuyuxuan
 */
@Repository
public class DealerDaoImpl implements DealerDao {

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<Dealer> getAllDealers() {
        return dealerRepository.findAll();
    }

    @Override
    public void addADealer(Dealer dealer) {
        dealerRepository.save(dealer);
    }

    @Override
    public Dealer getDealerById(Long Id) {
        return dealerRepository.getByDealerId(Id);
    }

    @Override
    public void updateDealer(Dealer dealer) {
        dealerRepository.save(dealer);
    }

    @Override
    public List<Store> getAllUnbindStore() {
        return storeRepository.getStoresByAttachedIsFalse();
    }

    @Override
    public List<Dealer> getAllUnbindDealers() {
        return dealerRepository.getByAttachedIsFalse();
    }

    @Override
    public void updateDealerPassword(Long dealerId, String newPassword) {

    }
}
