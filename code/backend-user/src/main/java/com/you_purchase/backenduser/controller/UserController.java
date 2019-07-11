package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.dto.UserInfoDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.parameter.UserLoginParameter;
import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController extends BaseController {

    //用户注册
    @RequestMapping(value = "/user/reg",method = RequestMethod.POST)
    public
    @ResponseBody
    UserInfoDTO UserReg(@RequestBody UserRegParameter userRegParameter){
        return userService.UserReg(userRegParameter);
    }


    //用户信息修改
    @RequestMapping(value = "/user/modify")
    public
    @ResponseBody
    UserLoginDTO UserModify(@RequestBody UserModifyParameter userModifyParameter){
        return userService.UserModify(userModifyParameter);
    }
    //用户登陆

    @RequestMapping(value = "/user/login")
    public
    @ResponseBody
    UserLoginDTO UserLogin(@RequestBody  UserLoginParameter userLoginParameter){
        return userService.UserLogin(userLoginParameter);
    }
    //用户查看信息

    @RequestMapping(value = "/user/check")
    public
    @ResponseBody
    UserLoginDTO UserCheck(long userId){
        return userService.UserCheck(userId);
    }


    //用户注册


    //用户支付
}
