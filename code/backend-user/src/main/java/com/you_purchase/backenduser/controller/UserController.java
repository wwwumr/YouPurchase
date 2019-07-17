package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.dto.UserInfoDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.parameter.SmsParameter;
import com.you_purchase.backenduser.parameter.UserLoginParameter;
import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Api(tags = "用户相关接口")
public class UserController extends BaseController {

    //用户注册
/*    @RequestMapping(value = "/user/reg",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户注册")
    UserInfoDTO UserReg(@RequestBody UserRegParameter userRegParameter){
        return userService.UserReg(userRegParameter);
    }*/

    //用户信息修改
    @RequestMapping(value = "/user/modify",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户信息修改")
    UserLoginDTO UserModify(@RequestBody UserModifyParameter userModifyParameter){
        return userService.UserModify(userModifyParameter);
    }

    //用户登陆
    @RequestMapping(value = "/user/login",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户登陆")
    UserLoginDTO UserLogin(@RequestBody  UserLoginParameter userLoginParameter){
        return userService.UserLogin(userLoginParameter);
    }
    //用户查看信息

    @RequestMapping(value = "/user/check",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看个人信息")
    UserLoginDTO UserCheck(long userId){
        return userService.UserCheck(userId);
    }



    //用户更新头像
    @PostMapping("/user/photo")
    @ApiOperation(value = "用户更新头像")
    public String UpdateUserPhoto(@RequestParam("file") MultipartFile file, @RequestParam("key") Long userId,
                                  @RequestParam("photo") String photo) {
        if (file == null) {
            return "ERROR";
        }
        String newAvatar = userService.UpdateUserPhoto(file,userId,photo);
        return newAvatar;
    }

    //用户获取短信验证码
    @RequestMapping(value = "/user/getMsg",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户获取注册验证码")
    int GetCode(String phone) throws Exception {
        return userService.GetCode(phone);
    }

    //短信验证
    @RequestMapping(value = "/user/checkMsg",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "验证码验证")
    int SmsRegister(@RequestBody SmsParameter smsParameter){
        return userService.SmsRegister(smsParameter);
    }

    //模拟用户支付，使用template调用虚拟接口
/*    @RequestMapping(value = "/user/pay",method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation(value = "用户支付")
    public */

}
