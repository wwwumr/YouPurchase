package com.sjtu.youpurchase.dao;

import org.springframework.data.repository.CrudRepository;
import com.sjtu.youpurchase.entity.User;

/*
* created by Deng Xiao
* */

public interface UserDao extends CrudRepository<User,String>{
    public User findByIdAndValid(long Id,boolean valid);
    public User findByUserNameAndValid(String userName,boolean valid);
    public User findByPhoneAndValid(String phone,boolean valid);

}