package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDao extends CrudRepository<User,String> {
    /*
    * 通过属性查询用户
    * */
    public User findByUserIdAndValid(long id,boolean valid);

    public User findByPhoneAndValid(String phone, boolean valid);


    //test use
    public User findByUserId(long userId);
    public User findByPhone(String phone);

}