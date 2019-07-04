package com.sjtu.youpurchase.dao;

import org.springframework.data.repository.CrudRepository;
import com.sjtu.youpurchase.entity.User;

/*
* 数据访问层接口
* 查询用户
* created by Deng Xiao
* */

public interface UserDao extends CrudRepository<User,String>{
    /*
    * 通过属性查询用户
    * */
    public User findByUserIdAndValid(long id,boolean valid);
    public User findByUserNameAndValid(String userName,boolean valid);
    public User findByPhoneAndValid(String phone,boolean valid);

}