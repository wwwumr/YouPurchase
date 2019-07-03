package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.SendMessageDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.parameter.UserRegisterParameter;
import com.sjtu.youpurchase.utils.Constrain;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.entity.User;
import org.springframework.stereotype.Service;




@Service
public class UserService extends BaseService {

    public UserLoginDTO UserLogin(UserLoginParameter userLoginParameter) {
        User user = UserDao.findByPhoneAndValid(userLoginParameter.getPhone(), true);
        if (user == null) {
            Constrain.log("该手机号码对应的用户不存在");
            return new UserLoginDTO(404, null);
        }
        if (user.pwdConfirm(userLoginParameter.getPassword())) {
            return new UserLoginDTO(200, user);
        }

        return new UserLoginDTO(403, null);
    }

    public UserLoginDTO userRegister(UserRegisterParameter userRegisterParameter){
        if(userRegisterParameter.getPhone().isEmpty()){
            Constrain.log("手机号码为空");
            return new UserLoginDTO(1,null);
        }

        User user=UserDao.findByPhoneAndValid(userRegisterParameter.getPhone(),true);
        if(user != null){
            Constrain.log("该手机号码已经注册");
            return new UserLoginDTO(2,null);
        }

        if(userRegisterParameter.getUserName().isEmpty()){
            Constrain.log("用户名为空");
            return new UserLoginDTO(3,null);
        }

        user = UserDao.findByUserNameAndValid(userRegisterParameter.getUserName(),true){
            if(user != null){
                Constrain.log("该用户名已存在");
                return new UserLoginDTO(4,null);
            }
        }

        user = new User();
        user.setInfo(userRegisterParameter);
        UserDao.save(user);

        return new UserLoginDTO(0,user);
    }


    public UserLoginDTO userSmsRegister(String phone,String validateCode,String regDate){
        if(phone.equals("")){
            Constrain.log("手机号码为空");
            return new UserLoginDTO(500,null);
        }

        //短信注册信息验证待做
        if(!checkMessage()){
            Constrain.log("验证码错误");
            return new UserLoginDTO(403,null);
        }

        User user = UserDao.findByPhoneAndValid(phone,true);
        if(user == null){
            user = new User();
            user.setSmsInfo(phone,regDate);
            UserDao.save(user);
        }
        return new UserLoginDTO(200,user);
    }

    //发送消息
    public SendMessageDTO sendMessageDTO(String phone,int code){
        String op="";
        switch(code){
            case 0:
                op = "登陆";break;
            case 1:
                op = "注册";break;
        }


        return new SendMessageDTO("");
    }

    //函数——checkMessage()
    public String checkMessage(String phone,String message){

    }


    //图片上传




}
