package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Admin;

/**
 * @author Chuyuxuan
 */
public interface AdminDao {

    /**
     * 通过用户名和密码获取对应的admin.
     * 用于验证身份
     *
     * @param userName 用户名
     * @param password 密码
     * @return 如果存在用户名密码符合条件的则返回对应admin，不存在返回null
     */
    Admin getAdminByUserNameAndPassword(String userName, String password);
}
