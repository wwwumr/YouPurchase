package com.sjtu.adminanddealer.serviceImpl;

import com.sjtu.adminanddealer.dao.AdminDao;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * @author Chuyuxuan
 */
@Service
public class AdminDealerLoginServiceImpl implements AdminDealerLoginService {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private DealerDao dealerDao;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Admin getAdminByUserNameAndPassword(String userName, String password) {
        return adminDao.getAdminByUserNameAndPassword(userName, password);
    }

    @Override
    public Dealer getDealerByUserNameAndPassword(String userName, String password) {
        return dealerDao.getDealerByUserNameAndPassword(userName, password);
    }

    @Override
    public void addSessionIdToRedis(String key, String value) {
        stringRedisTemplate.opsForValue().set(key, value);
    }

    @Override
    public void deleteSessionId(String key) {
        stringRedisTemplate.delete(key);
    }
}
