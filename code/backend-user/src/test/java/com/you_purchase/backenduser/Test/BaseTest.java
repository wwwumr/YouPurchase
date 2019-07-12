package com.you_purchase.backenduser.Test;




import com.you_purchase.backenduser.dao.OrderInfoDao;
import com.you_purchase.backenduser.dao.UserDao;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("Basetest")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BaseTest {
    @Autowired
    private UserDao userDao;
    @Autowired
    private OrderInfoDao orderInfoDao;

    //User
    @Test
    public void addUser(){
        User user = new User();
        user.setRegDate("19/04/2019");
        user.setValid(true);
        user.setAddress("熏烟湖");
        user.setLatitude(2.5);
        user.setLongitude(0.9);
        user.setGender("男");
        user.setPassword("2j94f3j21");
        user.setUserName("老恶魔王");
        user.setPhone("65103527191");
        user.setPhoto("D:/images");
        userDao.save(user);
    }

    @Test
    public void testUserDao(){
        User user1 = userDao.findByUserIdAndValid(23,true);
        Assert.assertNotNull(user1);
        Assert.assertEquals(user1.getAddress(),"灰烬墓地");
        Assert.assertEquals(user1.getRegDate(),"01/04/2019");
        Assert.assertEquals(user1.getGender(),"男");
        Assert.assertEquals(user1.getUserName(),"古达");

        User user = userDao.findByPhoneAndValid("65151191",true);
        Assert.assertNotNull(user);
        Assert.assertEquals(user.getAddress(),"罪业之都");
        Assert.assertEquals(user.getPassword(),"2jjoj9120021");

        User user2 = userDao.findByUserIdAndValid(21,true);
        Assert.assertNotNull(user2);
        Assert.assertEquals(user2.getAddress(),"亚诺尔隆德");
        Assert.assertEquals(user2.getUserName(),"沙立万");

        User user3 = userDao.findByPhoneAndValid("93571900",true);
        Assert.assertNotNull(user3);
        Assert.assertEquals(user3.getPassword(),"09909787");
        Assert.assertEquals(user3.getGender(),"男");

    }



}
