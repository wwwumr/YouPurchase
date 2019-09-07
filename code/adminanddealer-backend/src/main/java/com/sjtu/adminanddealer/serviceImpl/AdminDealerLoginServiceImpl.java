package com.sjtu.adminanddealer.serviceImpl;

import com.sjtu.adminanddealer.dao.AdminDao;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.UserDao;
import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.User;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import com.sjtu.adminanddealer.utils.Md5Util;
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
    private UserDao userDao;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Admin getAdminByUserNameAndPassword(String userName, String password) {
        return adminDao.getAdminByUserNameAndPassword(userName, password);
    }

    @Override
    public Dealer getDealerByUserNameAndPassword(String userName, String password) {
        return dealerDao.getDealerByUserNameAndPassword(userName, Md5Util.encode(password));
    }

    @Override
    public User getUserByUserNameAndPassword(String userName, String password) {
        return userDao.getUserByUserNameAndPassword(userName, password);
    }

    @Override
    public User getUserByPhoneAndPassword(String phone, String password) {
        return userDao.getUserByPhoneAndPassword(phone, password);
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
