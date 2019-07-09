package com.sjtu.youpurchase.BasicTest;


import com.sjtu.youpurchase.Dao.UserDao;
import com.sjtu.youpurchase.entity.User;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserTest {
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserService userService;





    //DAO查询通过
    @Test
    public void testFind(){
        User user = userDao.findByPhoneAndValid("123123",true);
        if(user != null)
            System.out.println("true");
    }

/*    //新增
    @Test
    public void testInsertUser(){
        User user = new User();
        user.setPhone("110");
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
    }*/

    //service层测试

    //登陆接口
    /*
    @Test
    public void testLoginService(){
        UserLoginParameter userLoginParameter = new UserLoginParameter();
        userLoginParameter.setPassword("123456");
        userLoginParameter.setPhone("123123");
        System.out.println("step1");
        //userService.test();
        userService.UserLogin(userLoginParameter);
    }
*/
    //修改个人信息接口
 /*    @Test
     @Rollback(false)
    public void testModifyUser(){
         UserModifyParameter userModifyParameter = new UserModifyParameter();
         userModifyParameter.setUserId(7);
         userModifyParameter.setAddress("洛斯里克高墙");
         userModifyParameter.setGender("女");
         userModifyParameter.setLatitude(13.1);
         userModifyParameter.setLongitude(15.2);
         userModifyParameter.setPassword("666666");
         userModifyParameter.setPhone("13111111234");
         userModifyParameter.setUserName("冷裂谷的舞娘");
         System.out.println("step1");
         userService.UserModify(userModifyParameter);
     }*/
}
