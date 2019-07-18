package com.you_purchase.backenduser.service;


import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.Sms.Message;
import com.you_purchase.backenduser.dto.MsgDTO;
import com.you_purchase.backenduser.dto.UserInfoDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.SmsParameter;
import com.you_purchase.backenduser.parameter.UserLoginParameter;
import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import com.zhenzi.sms.ZhenziSmsClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.xml.ws.spi.http.HttpHandler;
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

    @Value("${imageBaseDirectory}")
    private String imageBaseDirectory;

    @Value("${userDefaultAvatarUrl}")
    private String userDefaultAvatarUrl;

    //用户查看个人信息
    public UserLoginDTO UserCheck(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        return new UserLoginDTO(200,user);
    }

    public String UpdateUserPhoto(MultipartFile file,long userId,String photo){
        User user = userDao.findByUserIdAndValid(userId,true);
        if(photo.equals(this.userDefaultAvatarUrl)){
            String newPhoto = fileUploadUtil.saveFile(file);
            user.setPhoto(newPhoto);
            userDao.save(user);
            return newPhoto;
        }
        else{
            String newPhoto = fileUploadUtil.saveFile(file);
            user.setPhoto(newPhoto);
            userDao.save(user);
            fileUploadUtil.deleteFile(photo);
            return newPhoto;
        }
    }

    //禁用某个用户
    public int UserBlock(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        if(user == null){
            System.out.println("该用户不存在或已经被屏蔽");
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
            System.out.println( "该手机已注册");
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
     System.out.println("开始验证");
     if(!msg.getCode().equals(smsParameter.getCode())){
         System.out.println("验证码错误");
         return -403;
     }
     if(smsParameter.getTime() - msg.getTime()>300){
         System.out.println("验证码超时");
         return -402;
     }
     User user =new User();
     user.setPhone(smsParameter.getPhone());
     user.setValid(false);
     userDao.save(user);
     long id = user.getUserId();
     return id;
    }

}
