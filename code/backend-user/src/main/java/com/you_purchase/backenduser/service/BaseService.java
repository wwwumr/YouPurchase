package com.you_purchase.backenduser.service;

//import com.you_purchase.backenduser.Config.FileUploadUtil;
import com.you_purchase.backenduser.Config.FileUploadUtil;
import com.you_purchase.backenduser.RabbitMq.Sender;
import com.you_purchase.backenduser.dao.*;
import com.you_purchase.backenduser.dto.OrderCheckDTO;
import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.entity.*;
import com.you_purchase.backenduser.parameter.PayParameter;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    @Autowired
    protected CommodityDao commodityDao;

    //消息队列推送消息
    @Autowired
    protected Sender sender;




    //日期转换String-Date
    protected Date strToDate(String sDate){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try {
            date = formatter.parse(sDate);
            return date;
        } catch (ParseException e) {
            return null;
        }
    }

    //Date-String
    protected String datToStr(Date sDate){
        String date;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        date = formatter.format(sDate);
        return  date;
    }



    //检查日期格式
    protected static boolean isLegalDate(String sdate) {
        int legalLen = 19;
        if(sdate == null || sdate.length() !=legalLen ){
            return false;
        }
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try{
            Date date = formatter.parse(sdate);
            return sdate.equals(formatter.format(date));
        } catch (ParseException e) {
            return false;
        }
    }

    //生成订单号
    public String createOrderId(){
        Date date=new Date();
        DateFormat format = new SimpleDateFormat("yyyyMMdd");
        String time = format.format(date);
        int hashfirst = time.toString().hashCode();
        if(hashfirst<0){
            hashfirst = -hashfirst;
        }
        int hashCodeV = UUID.randomUUID().toString().hashCode();
        if (hashCodeV < 0) {//有可能是负数
            hashCodeV = -hashCodeV;
        }
        return String.format("011d",hashfirst) + String.format("%011d", hashCodeV);
    }

    //检查要查看的订单是否属于该id
    protected  boolean orderBelong(long orderInfoId,long id){
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId,true);
        if(orderInfo.getStoreId() == id){
            return true;
        }
        return false;
    }

    //orderCheck
    protected List<OrderInfoDTO> OrderCheck(List<OrderInfo> orderInfos){
        List<OrderInfoDTO> orderInfoDTOS = new ArrayList<>();
        //获取对应用户id的所有订单
        for (OrderInfo s : orderInfos) {
            //System.out.println(s.getOrderInfoId());
            OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
            orderInfoDTO.setStoreId(s.getStoreId());
            orderInfoDTO.setStatus(s.getStatus());
            orderInfoDTO.setOrderNo(s.getOrderInfoNo());
            orderInfoDTO.setTarPhone(s.getTarPhone());
            orderInfoDTO.setTarAddress(s.getTarAddress());
            orderInfoDTO.setTarPeople(s.getTarPeople());
            orderInfoDTO.setTarLongitude(deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(s.getDeliveryAddressId()).getLongitude());
            orderInfoDTO.setTarLatitude(deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(s.getDeliveryAddressId()).getLatitude());
            orderInfoDTO.setJudged(s.isJudged());
            String date = datToStr(s.getCreateDate());
            orderInfoDTO.setCreateDate(date);
            Store store = storeDao.findByStoreId(s.getStoreId());
            orderInfoDTO.setStoreName(store.getStoreName());;
            orderInfoDTO.setTotalPrice(s.getTotalPrice());
            orderInfoDTO.setOrderInfoId(s.getOrderInfoId());
            //获取对应订单id的所有商品
            List<OrderItem> orderItems = orderItemDao.findByOrderInfoId(s.getOrderInfoId());
            List<OrderCheckDTO> orderCheckDTOS = new ArrayList<>();
            for(OrderItem o:orderItems){
                OrderCheckDTO orderCheckDTO = new OrderCheckDTO();
                orderCheckDTO.setPrice(o.getPrice());
                orderCheckDTO.setAmount(o.getAmount());
                Commodity commodity = commodityDao.findByCommodityId(o.getCommodityId());
                orderCheckDTO.setCommodityCoverPicUrl(commodity.getCommodityCoverPicUrl());
                orderCheckDTO.setCommodityId(commodity.getCommodityId());
                orderCheckDTO.setCommodityInfo(commodity.getCommodityInfo());
                orderCheckDTOS.add(orderCheckDTO);
            }
            orderInfoDTO.setOrderItemList(orderCheckDTOS);
            orderInfoDTOS.add(orderInfoDTO);
        }
        return orderInfoDTOS;
    }







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
