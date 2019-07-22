package com.you_purchase.backenduser.service;

//import com.you_purchase.backenduser.Config.FileUploadUtil;
import com.you_purchase.backenduser.Config.FileUploadUtil;
import com.you_purchase.backenduser.dao.*;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.PayParameter;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class BaseService {
    @Autowired
    protected UserDao userDao;
    @Autowired
    protected OrderInfoDao orderInfoDao;
    @Autowired
    protected StoreDao storeDao;
    @Autowired
    protected OrderItemDao orderItemDao;
    @Autowired
    protected GradeDao gradeDao;
    @Autowired
    protected  SmsDao smsDao;
    @Autowired
    protected FileUploadUtil fileUploadUtil;
    @Autowired
    protected  RestTemplate restTemplate;
    @Autowired
    protected DeliveryAddressDao deliveryAddressDao;

    //第三方支付
    protected class Weixin{
        private String url;

        private String id;

        private String secrect;

        public Weixin(String url,String id,String secrect){
            this.setId(id);
            this.setSecrect(secrect);
            this.setUrl(url);
        }
        public String  send(PayParameter payParameter){
            payParameter.setStatus(1);
            return "success";
        }


        //getter and setter
        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getSecrect() {
            return secrect;
        }

        public void setSecrect(String secrect) {
            this.secrect = secrect;
        }
    }

    protected int UploadPhotoBase(long userId,String photo){
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        photo = photo.substring(photo.indexOf(",")+1);
        try {
            byte[] imageByte = Base64.decodeBase64(photo);
            //uuid产生唯一的图片名字
            String uuid = UUID.randomUUID().toString();
            String directory = "D://image/" + uuid +".jpg";
            System.out.println(directory+" hello");

            file = new File(directory);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(imageByte);
            User user = userDao.findByUserIdAndValid(userId,true);
            directory = directory.substring(directory.indexOf("//")+2);
            user.setPhoto(directory);
            return 200;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return 500;
    }
}
