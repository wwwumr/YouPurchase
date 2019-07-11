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
    public Long addADealer(Dealer dealer) {
        dealerRepository.saveAndFlush(dealer);
        return dealer.getDealerId();
    }

    @Override
    public void deleteDealer(Long dealerId) {
        if (dealerRepository.existsById(dealerId)) {
            dealerRepository.deleteDealerByDealerId(dealerId);
        }
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
    public List<Dealer> getAllUnbindDealers() {
        return dealerRepository.getByAttachedIsFalse();
    }

    @Override
    public Dealer getDealerByUserNameAndPassword(String userName, String password) {
        return dealerRepository.getDealerByUserNameAndPassword(userName, password);
    }

    @Override
    public void updateDealerPassword(Long dealerId, String newPassword) {
        // TODO: 经销商修改密码实现
    }

    @Override
    public void updateDealerAvatar(Long dealerId, String newAvatar) {
        dealerRepository.updateDealerAvatar(dealerId, newAvatar);
    }
}
