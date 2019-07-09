package com.sjtu.youpurchase.ControllerTest;


import com.alibaba.fastjson.JSON;
import com.sjtu.youpurchase.controller.UserController;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {UserController.class})
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserController userController;

    @MockBean
    private UserService userService;
    //对于接口测试，在你命名的接口前面要加个“斜杠”即本身接口为user，则测试时要设置为/user

    //登陆接口
/*    @Test
    public void testPostMethod() throws Exception{
        UserLoginParameter userLoginParameter = new UserLoginParameter();
        userLoginParameter.setPhone("123123");
        userLoginParameter.setPassword("123456");
        System.out.println("step1");
        this.mockMvc.perform(post("/user/login").content(JSON.toJSONString(userLoginParameter)).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }*/
    //用户修改信息接口
    @Test
    @Rollback(false)
    public void testModifyMethod() throws Exception{
        UserModifyParameter userModifyParameter = new UserModifyParameter();
        userModifyParameter.setUserId(9);
        userModifyParameter.setAddress("冷裂谷的伊鲁席尔");
        userModifyParameter.setGender("伪娘");
        userModifyParameter.setLatitude(13.1);
        userModifyParameter.setLongitude(15.2);
        userModifyParameter.setPassword("666666");
        userModifyParameter.setPhone("15111119993");
        userModifyParameter.setUserName("吞噬神明的埃尔德里奇");
        System.out.println("step1");
        this.mockMvc.perform(post("/user/modify").content(JSON.toJSONString(userModifyParameter)).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        System.out.println("step2");
    }
}
