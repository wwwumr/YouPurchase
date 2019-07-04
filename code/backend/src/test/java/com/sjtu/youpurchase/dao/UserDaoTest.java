package com.sjtu.youpurchase.dao;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.sjtu.youpurchase.dao.UserDao;
import com.sjtu.youpurchase.entity.User;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

/*
*
* 测试无法回滚，待解决
* */
@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserDaoTest {
    @Autowired
    private UserDao userDao;
    @Test
    public void testInsertUser(){
        User user = new User();
        user.setPhone("123123");
        user.setRegDate("01/01/2019");
        user.setPhoto("root/data/images");
        user.setPassword("123456");
        user.setLongitude(11.1);
        user.setLatitude(11.1);
        user.setAddress("东川路800");
        user.setUserName("zzz");
        user.setValid(true);
        userDao.save(user);
        User test = new User();
        test = userDao.findByPhoneAndValid("123123",true);
    }
}
