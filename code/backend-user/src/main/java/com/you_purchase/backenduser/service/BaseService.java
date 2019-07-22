package com.you_purchase.backenduser.service;

//import com.you_purchase.backenduser.Config.FileUploadUtil;
import com.you_purchase.backenduser.Config.FileUploadUtil;
import com.you_purchase.backenduser.dao.*;
import com.you_purchase.backenduser.entity.User;
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


/*    protected int UploadPhoto(long userId,String photo){
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            byte[] imageByte = Base64.decodeBase64(photo);
            //uuid产生唯一的图片名字
            String uuid = UUID.randomUUID().toString();
            String directory = photoDirectory + uuid +imageFormat;

            file = new File(directory);
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(imageByte);
            User user = userDao.findByUserIdAndValid(userId,true);
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
    }*/
}
