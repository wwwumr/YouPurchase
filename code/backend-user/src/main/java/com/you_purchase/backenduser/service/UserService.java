package com.you_purchase.backenduser.service;

import com.you_purchase.backenduser.dto.UserInfoDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.UserLoginParameter;
import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService{
    //用户注册
    public UserInfoDTO UserReg(UserRegParameter userRegParameter){
        User user = userDao.findByPhoneAndValid(userRegParameter.getPhone(),true);
        if(user != null){
            System.out.println("手机已注册");
            return new UserLoginDTO(404,null);
        }

        //短信验证通过，后面再加
        if(true) {
            User user1 = new User();
            user1.setReg(userRegParameter);
            userDao.save(user1);
            return new UserLoginDTO(200,user1);
        }
        return new UserLoginDTO(403,null);
    }
    //用户登陆
    public UserLoginDTO UserLogin(UserLoginParameter userLoginParameter){
        System.out.println("开始登陆");
        User user = userDao.findByPhoneAndValid(userLoginParameter.getPhone(),true);

        if(user == null){
            System.out.println("不存在该用户");
            return new UserLoginDTO(404,null);
        }
        if(user.pwdConfirm(userLoginParameter.getPassword())){
            System.out.println("登陆成功");
            return new UserLoginDTO(200,user);
        }
        return new UserLoginDTO(403,null);
    }
    //用户修改信息
    public UserLoginDTO UserModify(UserModifyParameter userModifyParameter){
        User user = userDao.findByUserIdAndValid(userModifyParameter.getUserId(),true);
        System.out.println(user.getUserId());
        user.setInfo(userModifyParameter);
        userDao.save(user);
        System.out.println("信息更新成功");
        return new UserLoginDTO(200,user);
    }
    //用户查看个人信息
    public UserLoginDTO UserCheck(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        return new UserLoginDTO(200,user);
    }
}
