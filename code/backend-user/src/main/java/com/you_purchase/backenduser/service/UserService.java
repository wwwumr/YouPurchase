package com.you_purchase.backenduser.service;


import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.Sms.Message;
import com.you_purchase.backenduser.dto.MsgDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.*;
import com.zhenzi.sms.ZhenziSmsClient;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.xml.ws.spi.http.HttpHandler;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Random;

@Service
public class UserService extends BaseService{


/*    //用户注册
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
    }*/

    //用户登陆
    public UserLoginDTO UserLogin(UserLoginParameter userLoginParameter){
        //System.out.println("开始登陆");
        User user = userDao.findByPhoneAndValid(userLoginParameter.getPhone(),true);

        if(user == null){
            //System.out.println("不存在该用户");
            return new UserLoginDTO(404,null);
        }
        if(user.pwdConfirm(userLoginParameter.getPassword())){
            //System.out.println("登陆成功");
            return new UserLoginDTO(200,user);
        }
        return new UserLoginDTO(403,null);
    }
    //用户修改信息
    public UserLoginDTO UserModify(UserModifyParameter userModifyParameter){
        User user = userDao.findByUserIdAndValid(userModifyParameter.getUserId(),true);
        //System.out.println(user.getUserId());
        user.setInfo(userModifyParameter);
        userDao.save(user);
        //System.out.println("信息更新成功");
        return new UserLoginDTO(200,user);
    }

    @Value("${imageBaseDirectory}")
    private String imageBaseDirectory;

    @Value("${userDefaultAvatarUrl}")
    private String userDefaultAvatarUrl;

    //用户查看个人信息
    public UserLoginDTO UserCheck(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        return new UserLoginDTO(200,user);
    }



    //禁用某个用户
    public int UserBlock(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        if(user == null){
            //System.out.println("该用户不存在或已经被屏蔽");
            return 403;
        }
        user.setValid(false);
        userDao.save(user);
        return 200;

    }



    //短信申请注册
    private String apiUrl = "https://sms_developer.zhenzikj.com";
    private String appId = "102064";
    private String appSecret = "a280ea22-e4d6-4a2b-a564-85c62434616f";
    public MsgDTO GetCode(String phone) throws Exception {
        User user = userDao.findByPhoneAndValid(phone,true);
        if(user != null){
            //System.out.println( "该手机已注册");
            return null;
        }
        try{
            JSONObject json = null;
            //随机生成验证码
            String code = String .valueOf(new Random().nextInt(999999));
            //调用榛子云接口发送短信
            ZhenziSmsClient client = new ZhenziSmsClient(apiUrl,appId,appSecret);
            String result = client.send(phone, "您的验证码为:" + code + "，该码有效期为5分钟，该码只能使用一次!");
            json = JSONObject.parseObject(result);
            if(json.getIntValue("code")!=0){
                return null;
            }
            //保存相关信息，并存入创建时间
            Message message = new Message();
            long time = System.currentTimeMillis()/1000;
            message.setSmsInfo(phone,code,time);
            smsDao.save(message);
            return new MsgDTO(message);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    //短信验证,验证通过则创建新的不可用用户，用户在完善信息后账户可用
    public long SmsRegister(SmsParameter smsParameter){
     Message msg = smsDao.findByMessageId(smsParameter.getMsgId());
     //System.out.println("开始验证");
     //System.out.println(msg.getCode());
     if(!msg.getCode().equals(smsParameter.getCode())){
         //System.out.println("验证码错误");
         return -403;
     }
     //System.out.println("Yes here");
     if(smsParameter.getTime() - msg.getTime()>300  || smsParameter.getTime() <= msg.getTime()){
         //System.out.println("验证码超时");
         return -402;
     }
        //System.out.println("Yes here2s");
     User user =new User();
     user.setPhone(smsParameter.getPhone());
     user.setPassword(smsParameter.getPassword());
     user.setValid(true);
        user.setLongitude(0);
        user.setLatitude(0);
     userDao.save(user);
     long id = user.getUserId();
     return id;
    }


    //用户上传头像
    public String UploadPhoto(UserPhotoParameter userPhotoParameter){
        User user = userDao.findByUserIdAndValid(userPhotoParameter.getUserId(),true);
        if(user == null){
            return "不存在该用户";
        }
        int code = UploadPhotoBase(userPhotoParameter.getUserId(),userPhotoParameter.getPhotoImage());
        System.out.println(code);
        if(code == 200){
            userDao.save(user);
            return "成功更新头像";
        }
        return  "失败";
    }

    public String GetPhoto(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        if(user.getPhoto().isEmpty()){
            return null;
        }
        String pwd = user.getPhoto();
        InputStream in = null;
        byte[] data = null;
        //读取图片字节数组
        try {
            in = new FileInputStream(pwd);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "data:image/jpeg;base64," + Base64.encodeBase64String(data);
    }


}
