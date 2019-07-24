/*
package com.you_purchase.backenduser.BaseTest;



//User底层逻辑测试
import com.you_purchase.backenduser.dao.OrderInfoDao;
import com.you_purchase.backenduser.dao.UserDao;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserBaseTest {

    @Autowired
    public UserDao userDao;

    @Autowired
    public OrderInfoDao orderInfoDao;


    @Test
    @Rollback(false)
    public void insertOrderInfo(){
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setJudged(false);
        orderInfo.setStatus(0);
        orderInfo.setValid(true);
        orderInfo.setCreateDate("01/01/2019");
        orderInfo.setUserId(4000);
        orderInfoDao.save(orderInfo);
    }


    @Test
    @Rollback(false)
    public void insertUser(){
        User user = new User();
        user.setValid(true);
        user.setPhone("123456");
        user.setUserName("Unname");
        user.setPhoto(" ");
        user.setPassword("123456");
        user.setGender("female");
        user.setLongitude(12.1);
        user.setLatitude(11.1);
        user.setAddress("Dratop");
        userDao.save(user);
    }





    @Test
    public void testDao1(){
        User user1 = userDao.findByUserIdAndValid(5,true);
        Assert.assertNotNull(user1);
        Assert.assertEquals(user1.getAddress(),"亚诺尔隆德");
        Assert.assertEquals(user1.getRegDate(),"01/02/2019");
        Assert.assertEquals(user1.getGender(),"男");
        Assert.assertEquals(user1.getPassword(),"999999");
        Assert.assertEquals(user1.getUserName(),"沙立万");
    }

    @Test
    public void testDao2(){
        User user = userDao.findByPhoneAndValid("123456",true);
        Assert.assertNotNull(user);
        Assert.assertEquals(user.getGender(),"男");
        Assert.assertEquals(user.getUserId(),5);
    }

    @Test
    public void testAddUser(){
        User user = new User();
        UserRegParameter userRegParameter = new UserRegParameter();
        userRegParameter.setPhone("000000");
        userRegParameter.setRegDate("11/07/2019");
        user.setUserId(11);
        user.setReg(userRegParameter);
        userDao.save(user);
        User user1 = userDao.findByUserId(11);
        Assert.assertEquals(user1.getPhone(),"000000");
        Assert.assertEquals(user1.getRegDate(),"11/07/2019");
        Assert.assertEquals(user1.isValid(),false);
    }
    @Test
    public void testSetInfo(){
        UserModifyParameter userModifyParameter  = new UserModifyParameter();
        userModifyParameter.setAddress("法兰要塞");
        userModifyParameter.setUserId(6);
        User user = userDao.findByUserIdAndValid(userModifyParameter.getUserId(),true);
        user.setInfo(userModifyParameter);
        userDao.save(user);
        User user1 = userDao.findByUserIdAndValid(6,true);
        Assert.assertEquals(user1.getAddress(),"法兰要塞");
    }
    @Test
    public void testModifyInfo(){
        User user = userDao.findByUserId(11);
        UserModifyParameter userModifyParameter = new UserModifyParameter();
        userModifyParameter.setAddress("无主墓地");
        userModifyParameter.setGender("男");
        user.setInfo(userModifyParameter);
        userDao.save(user);
        User user1 = userDao.findByUserId(11);
        Assert.assertEquals(user1.getAddress(),"无主墓地");
        Assert.assertEquals(user1.getGender(),"男");
        Assert.assertEquals(user1.isValid(),true);
    }



}
*/
