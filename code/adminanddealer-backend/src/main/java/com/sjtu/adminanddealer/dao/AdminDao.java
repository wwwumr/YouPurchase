package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Admin;

/**
 * @author Chuyuxuan
 */
public interface AdminDao {

    Admin getAdminByUserNameAndPassword(String userName, String password);
}
