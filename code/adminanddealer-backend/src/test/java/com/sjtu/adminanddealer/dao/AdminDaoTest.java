package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Admin;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * AdminDao的测试类
 *
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AdminDaoTest {

    @Autowired
    private AdminDao adminDao;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(adminDao);
    }

    @Test
    public void testGetAdminByUserNameAndPassword() throws Exception {
        // assume we have only one tuple in table `admin`
        // (user_name, password) => ("admin", "1234")
        Admin admin1 = adminDao.getAdminByUserNameAndPassword("admin", "1234");
        Assert.assertNotNull(admin1);
        Admin admin2 = adminDao.getAdminByUserNameAndPassword("admin", "123456");
        Assert.assertNull(admin2);
        Admin admin3 = adminDao.getAdminByUserNameAndPassword("user", "1234");
        Assert.assertNull(admin3);
    }

}