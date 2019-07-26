package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.User;
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
 * UserDao的测试类.
 *
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserDaoTest {
    @Autowired
    private UserDao userDao;

    @Test
    public void testGetUserByUserNameAndPassword() throws Exception {
        User user = userDao.getUserByUserNameAndPassword("test", "1234");
        Assert.assertNotNull(user);
        User user1 = userDao.getUserByUserNameAndPassword("wrong", "123");
        Assert.assertNull(user1);
    }

    @Test
    public void testGetUserByPhoneAndPassword() throws Exception {
        User user = userDao.getUserByPhoneAndPassword("1234567", "1234");
        Assert.assertNotNull(user);
        User user1 = userDao.getUserByPhoneAndPassword("020-1234", "abcd");
        Assert.assertNull(user1);
    }
}