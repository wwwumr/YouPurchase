package com.sjtu.adminanddealer.daoImpl;

import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.repository.DealerRepository;
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
    public void updateDealerPassword(Long dealerId, String newPassword) {

    }
}
