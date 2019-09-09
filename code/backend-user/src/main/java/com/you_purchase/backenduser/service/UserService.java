package com.you_purchase.backenduser.service;


import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.Config.Constrain;
import com.you_purchase.backenduser.Sms.Message;
import com.you_purchase.backenduser.dto.MsgDTO;
import com.you_purchase.backenduser.dto.RecDTO;
import com.you_purchase.backenduser.dto.UserLoginDTO;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.entity.UserTag;
import com.you_purchase.backenduser.parameter.*;
import com.zhenzi.sms.ZhenziSmsClient;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class UserService extends BaseService{


    //用户登陆
    public UserLoginDTO UserLogin(UserLoginParameter userLoginParameter){
        System.out.println("开始登陆");
        System.out.println("手机:"+userLoginParameter.getPhone());
        User user = userDao.findByPhoneAndValid(userLoginParameter.getPhone(),true);
        System.out.println("用户获取成功");
        if(user == null){
            System.out.println("不存在该用户");
            Constrain.log("不存在该用户");
            return new UserLoginDTO(-404,null);
        }
        if(user.pwdConfirm(userLoginParameter.getPassword())){
            System.out.println("登陆成功");
            //
            System.out.println(user.getUserId());
            return new UserLoginDTO(200,user);
        }
        System.out.println("开始返回信息");
        return new UserLoginDTO(-403,null);
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

    //用户修改密码
    public long PwdModify(String oldPwd,String newPwd,long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        if(user.getPassword().equals(oldPwd)){
            user.setPassword(newPwd);
            userDao.save(user);
            return 200;
        }
        return -403;
    }

    //用户修改手机号码(ok)
    public long PhoneModify(PhoneParameter phoneParameter){
        //System.out.println(phoneParameter.getUserId());
        Message message = smsDao.findByMessageIdAndAndValid(phoneParameter.getMsgId(),true);
        if(message == null){
            return -404;
        }
        String phone = message.getPhone();
        if(!phoneParameter.getPhone().equals(phone)){
            //手机号不对
            return -406;
        }
        User user = userDao.findByUserIdAndValid(phoneParameter.getUserId(),true);
        if(user == null){
            return -405;
        }
        if(message.getCode().equals(phoneParameter.getCode())){
            user.setPhone(phoneParameter.getPhone());
            userDao.save(user);
            message.setValid(false);
            smsDao.save(message);
            return 200;
        }
        return -403;
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
            return -403;
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
            //System.out.println( "该手机已使用");
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


    //用户找回密码获取验证短信
    public MsgDTO PwdCode(String phone) throws Exception{
        User user = userDao.findByPhoneAndValid(phone,true);
        if(user == null){
            return null;
        }
        try{
            JSONObject json = null;
            //随机生成验证码
            String code = String .valueOf(new Random().nextInt(999999));
            //调用榛子云接口发送短信
            ZhenziSmsClient client = new ZhenziSmsClient(apiUrl,appId,appSecret);
            String result = client.send(phone, "验证码为:" + code + "，该码有效期为5分钟，该码只能使用一次!");
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


    //用户找回密码（ok）
    public long pwdFind(String  phone,String newPwd,long msgId,String code){
        Message msg = smsDao.findByMessageIdAndAndValid(msgId,true);
        if(msg==null){
            return -404;
        }
        if(!phone.equals(msg.getPhone())){
            //手机号不对
            return -406;
        }
        User user = userDao.findByPhoneAndValid(msg.getPhone(),true);
        if(user == null){
            //不存在该用户
            return -405;
        }

        if(msg.getCode().equals(code)){
            user.setPassword(newPwd);
            userDao.save(user);
            msg.setValid(false);
            smsDao.save(msg);
            return 200;
        }
        return -403;
    }

    //短信验证,验证通过则创建新的不可用用户，用户在完善信息后账户可用(ok)
    public long SmsRegister(SmsParameter smsParameter){
        //System.out.println(smsParameter.getMsgId());
        Message msg = smsDao.findByMessageIdAndAndValid(smsParameter.getMsgId(),true);
        if(msg == null){
            //验证码失效
            return -404;
        }
        String phone = msg.getPhone();
        if(!smsParameter.getPhone().equals(phone)){
            //手机号不对
            return -406;
        }
     //System.out.println("开始验证");
     //System.out.println(msg.getCode());
     if(!msg.getCode().equals(smsParameter.getCode())){
         //System.out.println("验证码错误");
         msg.setValid(false);
         smsDao.save(msg);
         return -403;

     }
     System.out.println("Yes here");
     if(smsParameter.getTime() - msg.getTime()>300  || smsParameter.getTime() <= msg.getTime()){
         //System.out.println("验证码超时");
         msg.setValid(false);
         smsDao.save(msg);
         return -402;
     }
     System.out.println("2");
     msg.setValid(false);
     smsDao.save(msg);

        UserTag userTag = new UserTag();
        userTag.setType1(null);
        userTag.setType2(null);
        userTag.setType3(null);
        userTag.setType4(null);
        userTagDao.save(userTag);
        long recId = userTag.getUserTagId();


     System.out.println("3");
     User user =new User();
     user.setUserTagId(recId);
     System.out.println("4");
     user.setPhone(phone);
     user.setPassword(smsParameter.getPassword());
     user.setValid(true);
     user.setLongitude(0);
     user.setLatitude(0);
     SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     String now = formatter.format(new Date());
     Date regDate = strToDate(now);
     user.setRegDate(regDate);
     userDao.save(user);
     return user.getUserId();
    }


    //用户上传头像
    public long UploadPhoto(UserPhotoParameter userPhotoParameter){
        User user = userDao.findByUserIdAndValid(userPhotoParameter.getUserId(),true);
        if(user == null){
            return -403;
        }
        int code = UploadPhotoBase(userPhotoParameter.getUserId(),userPhotoParameter.getPhotoImage());
        System.out.println(code);
        if(code == 200){
            userDao.save(user);
            return 200;
        }
        return  -404;
    }

    /*public String GetPhoto(long userId){
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
*/
    //商品推荐
    public List<RecDTO> UserRec(long userId){
        User user = userDao.findByUserIdAndValid(userId,true);
        UserTag userTag = userTagDao.findByUserTagId(user.getUserTagId());
        List<RecDTO> recDTOS = new ArrayList<>();
        recDTOS.add(CommodityGet(userTag.getType1()));
        recDTOS.add(CommodityGet(userTag.getType2()));
        recDTOS.add(CommodityGet(userTag.getType3()));
        recDTOS.add(CommodityGet(userTag.getType4()));
        return recDTOS;
    }
}
