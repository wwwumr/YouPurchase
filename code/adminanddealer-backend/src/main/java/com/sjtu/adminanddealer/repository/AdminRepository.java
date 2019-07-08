package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Chuyuxuan
 */
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin getAdminByUserNameAndPassword(String userName, String password);
}
