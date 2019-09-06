package com.you_purchase.backenduser.controller;

import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.dao.UserDao;
import com.you_purchase.backenduser.dto.MsgDTO;
import com.you_purchase.backenduser.dto.UserInfoDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.*;
import com.you_purchase.backenduser.service.BaseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@Api(tags = "用户相关接口")
public class UserController extends BaseController {

    @Autowired
    private UserDao userDao;
    @Autowired
    private BaseService baseService;

    //用户信息修改
    @RequestMapping(value = "/user/modify",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户信息修改")
    UserLoginDTO UserModify(@RequestBody UserModifyParameter userModifyParameter,HttpSession session){
        if(session.getAttribute("userId") == null){
            return null;
        }
        return userService.UserModify(userModifyParameter);
    }

    //用户登陆
    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户登陆")
    UserLoginDTO UserLogin(@RequestBody  UserLoginParameter userLoginParameter,HttpSession session){
        String phone = userLoginParameter.getPhone();
        String pwd = userLoginParameter.getPassword();
        User user = userDao.findByPhoneAndValid(phone,true);
        if(user != null && user.getPassword().equals(pwd)){
            session.setAttribute("userId",user.getUserId());
            baseService.addSessionIdToRedis("loginUser:" + user.getUserId(), session.getId());
            return new UserLoginDTO(200, user);
        }
        return new UserLoginDTO(404, null);
    }


    //用户注销
    @RequestMapping(value = "/user/logout",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "注销")
    String UserLogout(HttpSession session){
        long userId = (long)session.getAttribute("userId");
        session.removeAttribute("userId");
        baseService.delSession("userId"+userId);
        return "Logout";
    }

    //用户查看信息
    @RequestMapping(value = "/user/check",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看个人信息")
    UserLoginDTO UserCheck(long userId,HttpSession session){
        if(session.getAttribute("userId") == null){
            return null;
        }
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

    //修改密码
    @RequestMapping(value = "/user/pwdModify",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户修改密码")
    int PwdModify(String oldPwd,String newPwd,HttpSession session){
        if(session.getAttribute("userId") == null){
            return 403;
        }
        long userId = (long) session.getAttribute("userId");
        return userService.PwdModify(oldPwd,newPwd,userId);
    }

    //修改手机号码
    @RequestMapping(value = "/user/phoneModify",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "修改手机号码")
    int PhoneModify(SmsParameter smsParameter, HttpSession session){
        if(session.getAttribute("userId") == null){
            return 403;
        }
        long userId = (long) session.getAttribute("userId");
        return userService.PhoneModify(userId,smsParameter);
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
    String UploadPhoto(@RequestBody UserPhotoParameter userPhotoParameter,HttpSession session){
        if(session.getAttribute("userId") == null){
            return null;
        }
        return userService.UploadPhoto(userPhotoParameter);
    }

}
