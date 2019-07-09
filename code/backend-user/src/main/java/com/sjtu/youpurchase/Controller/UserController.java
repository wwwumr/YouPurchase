package com.sjtu.youpurchase.Controller;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.parameter.UserPhotoParameter;
import com.sjtu.youpurchase.service.UserService;
import com.sjtu.youpurchase.utils.Constrain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/*
* 用户相关controller
* created by Deng Xiao
* */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //用户信息修改
    @RequestMapping(value="user/modify",method= RequestMethod.POST)
    public
    @ResponseBody
    UserInfoDTO UserModify(@RequestBody UserModifyParameter userModifyParameter){
        return userService.UserModify(userModifyParameter);
    }


    //用户登陆
    @RequestMapping(value = "user/login",method=RequestMethod.POST)
    public
    @ResponseBody
    UserLoginDTO UserLogin(@RequestBody UserLoginParameter userLoginParameter){
        return userService.UserLogin(userLoginParameter);
    }

    //上传图片
    @RequestMapping(value = "user/uploadPhoto", method = RequestMethod.POST)
    public
    @ResponseBody
    String uploadPhoto(@RequestBody UserPhotoParameter userPhotoParameter) {
        return userService.UploadPhoto(userPhotoParameter);
    }

    //获取图片
    @ResponseBody
    @RequestMapping(value = "/user/getphoto", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public String getPhoto(String phone) {
        try {
            return userService.getPhoto(phone);
        } catch (IOException e) {
            Constrain.logerror(e);
            throw new RuntimeException("图片IO错误");
        }
    }

}
