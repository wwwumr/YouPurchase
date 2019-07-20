package com.sjtu.adminanddealer.daoImpl;

import com.sjtu.adminanddealer.dao.UserDao;
import com.sjtu.adminanddealer.entity.User;
import com.sjtu.adminanddealer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserByUserNameAndPassword(String userName, String password) {
        return userRepository.getUserByUserNameAndPassword(userName, password);
    }

    @Override
    public User getUserByPhoneAndPassword(String phone, String password) {
        return userRepository.getUserByPhoneAndPasswordAndValidIsTrue(phone, password);
    }
}
