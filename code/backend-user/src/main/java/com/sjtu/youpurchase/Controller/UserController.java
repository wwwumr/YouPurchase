package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.parameter.UserPhotoParameter;
import com.sjtu.youpurchase.service.UserService;
import com.sjtu.youpurchase.utils.Constrain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
* 用户相关controller
* created by Deng Xiao
* */
@CrossOrigin
@Controller
public class UserController extends BaseController{

    //用户信息修改
    @RequestMapping(value="user/modify")
    public
    @ResponseBody
    UserLoginDTO UserModify(HttpServletRequest request,HttpServletResponse response){
        String tempuserId = request.getParameter("userId");
        long userId = Long.parseLong(tempuserId);
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        String address = request.getParameter("address");
        String phone = request.getParameter("phone");
        String gender = request.getParameter("gender");
        String regDate = request.getParameter("regDate");
        String templatitude = request.getParameter("latitude");
        double  latitude =  Double.parseDouble(templatitude);
        String templongitude = request.getParameter("longitude");
        double longitude = Double.parseDouble(templongitude);
        UserModifyParameter userModifyParameter = new UserModifyParameter( userId,userName,password,address,phone,gender,regDate,
        latitude,longitude);
        System.out.println(userId);
        return userService.UserModify(userModifyParameter);
    }


    //用户登陆
    @RequestMapping(value = "user/login")
    public
    @ResponseBody
    UserLoginDTO UserLogin(HttpServletRequest request, HttpServletResponse response){
        String phone = request.getParameter("phone");
        String password = request.getParameter("password");
        UserLoginParameter userLoginParameter = new UserLoginParameter(phone,password);
        return userService.UserLogin(userLoginParameter);
    }
/*    @PostMapping(value="user/login",produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    UserLoginDTO UserLogin(@RequestBody UserLoginParameter userLoginParameter){
        return userService.UserLogin(userLoginParameter);
    }*/

    //上传图片
    @PostMapping(value = "user/uploadPhoto", produces = MediaType.APPLICATION_JSON_VALUE)
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
