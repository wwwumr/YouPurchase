package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.User;

/**
 * 用户登录验证的DAO层
 *
 * @author Chuyuxuan
 */
public interface UserDao {

    /**
     * 用户名和密码从数据库中获取用户信息
     *
     * @param userName 用户名
     * @param password 密码
     * @return 返回对应的用户实体类，没有找到返回null
     */
    User getUserByUserNameAndPassword(String userName, String password);

    /**
     * 手机与密码 获取用户
     *
     * @param phone    手机号
     * @param password 密码
     * @return 返回对应的用户实体类，没有找到返回null
     */
    User getUserByPhoneAndPassword(String phone, String password);
}
