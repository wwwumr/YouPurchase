package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.parameter.UserRegisterParameter;

/*
* 用户相关的服务层接口
* created by Deng Xiao
* */


public interface UserService {

    //修改用户信息
   UserInfoDTO UserRegister(UserRegisterParameter userRegisterParameter);


}
