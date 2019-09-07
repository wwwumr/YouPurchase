package com.you_purchase.backenduser.controller;

import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.dto.MsgDTO;
import com.you_purchase.backenduser.dto.UserInfoDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@Api(tags = "用户相关接口")
public class UserController extends BaseController {




    //用户信息修改
    @RequestMapping(value = "/user/modify",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户信息修改")
    UserLoginDTO UserModify(@RequestBody UserModifyParameter userModifyParameter){
        return userService.UserModify(userModifyParameter);
    }

    //用户修改密码
    @RequestMapping(value = "/user/pwdModify",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户密码修改")
    long PwdModify(String oldPwd,String newPwd,long userId){
        return userService.PwdModify(oldPwd,newPwd,userId);
    }

    //用户修改手机号码
    @RequestMapping(value = "/user/phoneModify",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户修改手机号码")
    long PhoneModify(PhoneParameter phoneParameter){
        return userService.PhoneModify(phoneParameter);
    }

    //用户登陆
    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户登陆")
    UserLoginDTO UserLogin(@RequestBody  UserLoginParameter userLoginParameter){
        System.out.println("start user Login");
        return userService.UserLogin(userLoginParameter);
    }


    //密码找回的获取验证码接口
    @RequestMapping(value = "/user/pwdSms",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "密码找回的获取验证短信的接口")
    MsgDTO PwdCode(String phone) throws Exception {
        return userService.PwdCode(phone);
    }

    //用户找回密码
    @RequestMapping(value = "/user/pwdFind",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "密码找回")
    long PwdFind(String phone,String newPwd,long msgId,String code){
        return userService.pwdFind(phone,newPwd,msgId,code);
    }

    //用户查看信息
    @RequestMapping(value = "/user/check",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看个人信息")
    UserLoginDTO UserCheck(long userId){
        return userService.UserCheck(userId);
    }


    //用户获取短信验证码
    @RequestMapping(value = "/user/getMsg",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户获取注册验证码")
    MsgDTO GetCode(String phone) throws Exception {
        return userService.GetCode(phone);
    }

    //短信验证
    @RequestMapping(value = "/user/checkMsg",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "验证码验证")
    long SmsRegister(@RequestBody SmsParameter smsParameter){
        return userService.SmsRegister(smsParameter);
    }

    //用户拉黑
    @RequestMapping(value = "/user/black",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户拉黑")
    int UserBlock(long userId){
        return userService.UserBlock(userId);
    }

    //用户上传头像
    @RequestMapping(value = "/user/uploadPhoto",method = RequestMethod.POST)
    public
    @ResponseBody
    String UploadPhoto(@RequestBody UserPhotoParameter userPhotoParameter){
        return userService.UploadPhoto(userPhotoParameter);
    }

}
