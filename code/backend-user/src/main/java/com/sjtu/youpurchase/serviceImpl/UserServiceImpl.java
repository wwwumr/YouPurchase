package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.UserInfoDTO;
import com.sjtu.youpurchase.DTO.UserLoginDTO;
import com.sjtu.youpurchase.Dao.UserDao;
import com.sjtu.youpurchase.entity.User;
import com.sjtu.youpurchase.utils.Constrain;
import com.sjtu.youpurchase.parameter.UserLoginParameter;
import com.sjtu.youpurchase.parameter.UserPhotoParameter;
import com.sjtu.youpurchase.parameter.UserRegParameter;
import com.sjtu.youpurchase.service.UserService;
import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.utils.Constrain;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;
import java.io.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    /*//public int test(){
        return 1;
    }*/

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

    //用户登陆
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

    //头像上传
    public  String UploadPhoto(UserPhotoParameter userPhotoParameter){
        if(userPhotoParameter.getPhone().isEmpty()){
            Constrain.log("手机号码为空");
            return "{\"result\":\"error:手机号码为空\"}";
        }
        User user = userDao.findByPhoneAndValid(userPhotoParameter.getPhone(),true);
        if(user == null){
            Constrain.log("该用户不存在");
            return "{\"result\":\"error:该用户不存在\"}";
        }
        //UploadPhotoBase
        int code;
        String photoDirectory = "D/images";
        String imageFormat = ".jpg";
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try{
            byte[] imageByte = Base64.decodeBase64(userPhotoParameter.getPhotoImageValue());
            String uuid = UUID.randomUUID().toString();
            String directory = photoDirectory + uuid + imageFormat;
            Constrain.log(directory);

            file = new File(directory);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(imageByte);
            user.setPhoto(directory);
            code = 200;
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            if(bos != null){
                try{
                    bos.close();
                }catch(IOException e1){
                    e1.printStackTrace();
                }
            }
            if(fos != null){
                try{
                    fos.close();
                }catch(IOException e1){
                    e1.printStackTrace();
                }
            }
        }
        code=500;
        //
        if (code == 200){
            userDao.save(user);
            return "{\"result\":\"OK\"}";
        }
        return "{\"result\":\"error\"}";
    }


    //头像获取
    public String getPhoto(String phone) throws IOException{
        User user = userDao.findByPhoneAndValid(phone,true);
        if(user == null){
            return null;
        }
        if(user.getPhoto().isEmpty()){
            return null;
        }
        String pwd = user.getPhoto();
        InputStream in =null;
        byte[] data =null;
        try{
            in = new FileInputStream(pwd);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        }catch (IOException e){
            e.printStackTrace();
        }
        return "data:image/jpeg;base64," + Base64.encodeBase64String(data);
    }

}