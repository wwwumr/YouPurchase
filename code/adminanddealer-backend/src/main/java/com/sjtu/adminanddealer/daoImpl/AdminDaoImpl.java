package com.sjtu.adminanddealer.daoImpl;

import com.sjtu.adminanddealer.dao.AdminDao;
import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @author Chuyuxuan
 */
@Repository
public class AdminDaoImpl implements AdminDao {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Admin getAdminByUserNameAndPassword(String userName, String password) {
        return adminRepository.getAdminByUserNameAndPassword(userName, password);
    }
}
