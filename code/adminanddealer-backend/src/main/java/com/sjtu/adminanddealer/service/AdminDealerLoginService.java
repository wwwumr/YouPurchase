package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.User;

/**
 * 管理员与经销商登录注销等逻辑.
 *
 * @author Chuyuxuan
 */
public interface AdminDealerLoginService {
    /**
     * 用用户名与密码从数据库中获取管理员.
     * 用于验证登录.
     *
     * @param userName 用户名
     * @param password 密码
     * @return 验证成功返回对应管理员，失败则返回null
     */
    Admin getAdminByUserNameAndPassword(String userName, String password);

    /**
     * 用用户名与密码从数据库中获取经销商.
     * 用于验证登录.
     *
     * @param userName 用户名
     * @param password 密码
     * @return 验证成功返回对应经销商，失败则返回null
     */
    Dealer getDealerByUserNameAndPassword(String userName, String password);

    /**
     * 用户名和密码从数据库中获取用户
     * 用于验证用户登录
     *
     * @param userName 用户名
     * @param password 密码
     * @return 验证成功返回对应用户，失败返回null
     */
    User getUserByUserNameAndPassword(String userName, String password);

    /**
     * 通过手机号与密码获取用户
     * 用于验证用户登录
     *
     * @param phone    手机号
     * @param password 密码
     * @return 验证成功返回对应用户，失败返回null
     */
    User getUserByPhoneAndPassword(String phone, String password);

    /**
     * 把登录过后的sessionId保存在redis中，防止重复登录
     *
     * @param key   loginUserId:{id}
     * @param value sessionId
     */
    void addSessionIdToRedis(String key, String value);

    /**
     * 当用户注销时，从redis中删除sessionId
     *
     * @param key key
     */
    void deleteSessionId(String key);
}
