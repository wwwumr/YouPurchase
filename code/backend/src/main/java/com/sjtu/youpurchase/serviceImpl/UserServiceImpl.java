package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.dao.UserDao;
import com.sjtu.youpurchase.entity.User;
import com.sjtu.youpurchase.service.UserService;
import com.sjtu.youpurchase.parameter.UserRegisterParameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    //修改用户信息
    public UserInfoDTO UserRegister(UserRegisterParameter userRegisterParameter){
        User user= userDao.findByPhoneAndValid(userRegisterParameter.getPhone(),true);
        user.setInfo(userRegisterParameter);
        userDao.save(user);
        return new UserInfoDTO(user);
    }
}
