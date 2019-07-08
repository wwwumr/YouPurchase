package com.sjtu.youpurchase.Controller;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/*
* 用户相关controller
* created by Deng Xiao
* */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //用户信息修改
    @RequestMapping(value="user/modify",method= RequestMethod.POST)
    public
    @ResponseBody
    UserInfoDTO UserModify(@RequestBody UserModifyParameter userModifyParameter){
        return userService.UserModify(userModifyParameter);
    }


    //test
 /*   @RequestMapping(value="user/login",method= RequestMethod.GET)
    public
    String UserRegister( ){
        return "hhhhhhhhh";
    }*/
    //用户登陆
    @RequestMapping(value = "user/login",method=RequestMethod.POST)
    public
    @ResponseBody
    UserLoginDTO UserLogin(@RequestBody UserLoginParameter userLoginParameter){
        return userService.UserLogin(userLoginParameter);
    }

}
