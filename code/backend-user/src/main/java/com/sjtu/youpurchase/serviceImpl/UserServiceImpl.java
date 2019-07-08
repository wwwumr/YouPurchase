package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.Dao.UserDao;
import com.sjtu.youpurchase.entity.User;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserRegParameter;
import com.sjtu.youpurchase.service.UserService;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.utils.Constrain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    public int test(){
        return 1;
    }

    //用户注册
    public UserInfoDTO UserRegister(UserRegParameter userRegParameter){
        User user = new User();


        return new UserInfoDTO(user);
    }

    //修改用户信息
    public UserInfoDTO UserModify(UserModifyParameter userModifyParameter){
        User user= userDao.findByUserIdAndValid(userModifyParameter.getUserId(),true);
        user.setInfo(userModifyParameter);
        userDao.save(user);
        System.out.println("信息更新成功");
        return new UserInfoDTO(user);
    }

    public UserLoginDTO UserLogin(UserLoginParameter userLoginParameter){
        System.out.println("开始登陆");
        User user = userDao.findByPhoneAndValid(userLoginParameter.getPhone(),true);

            if(user == null){
                System.out.println("不存在该用户");
                Constrain.log("该用户不存在");
                return new UserLoginDTO(404,null);
            }
            if(user.pwdConfirm(userLoginParameter.getPassword())){
                System.out.println("登陆成功");
                return new UserLoginDTO(200,user);
            }
            return new UserLoginDTO(403,null);

    }
}
