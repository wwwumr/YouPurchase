package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.entity.User;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.parameter.UserPhotoParameter;
import com.sjtu.youpurchase.parameter.UserRegParameter;

import java.io.IOException;

/*
* 用户相关的服务层接口
* created by Deng Xiao
* */


public interface UserService {

    //用户注册
    UserInfoDTO UserRegister(UserRegParameter userRegParameter);

    //修改用户信息
   UserInfoDTO UserModify(UserModifyParameter userModifyParameter);

   //用户登陆
    UserLoginDTO UserLogin(UserLoginParameter userLoginParameter);

    //int test();

    //头像上传
    String UploadPhoto(UserPhotoParameter userPhotoParameter);

    //获取头像
    String getPhoto(String phone)throws IOException;


}
