package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserRegisterParameter;
import com.sjtu.youpurchase.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/*
 * 用户相关controller
 * created by Deng Xiao
 * */

public class UserController {

    @Autowired
    private UserService userService;

    //用户信息修改
    @RequestMapping(value = "user/register", method = RequestMethod.POST)
    public
    @ResponseBody
    UserInfoDTO UserRegister(@RequestBody UserRegisterParameter userRegisterParameter) {
        return userService.UserRegister(userRegisterParameter);
    }

    //用户登陆
    @RequestMapping(value = "user/login",method=RequestMethod.POST)
    public
    @ResponseBody
    UserLoginDTO UserLogin(@RequestBody UserLoginParameter userLoginParameter){
        return userService.UserLogin(userLoginParameter);
    }

}
