package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;

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
}
