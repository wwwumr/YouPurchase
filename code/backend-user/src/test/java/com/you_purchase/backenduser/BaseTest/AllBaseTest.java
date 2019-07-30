package com.you_purchase.backenduser.BaseTest;



//User底层逻辑测试
import com.you_purchase.backenduser.dao.*;
import com.you_purchase.backenduser.entity.Commodity;
import com.you_purchase.backenduser.entity.Dealer;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AllBaseTest {

    @Autowired
    public UserDao userDao;
    @Autowired
    public OrderInfoDao orderInfoDao;
    @Autowired
    public OrderItemDao orderItemDao;
    @Autowired
    public StoreDao storeDao;
    @Autowired
    public CommodityDao commodityDao;
    @Autowired
    public DeliveryAddressDao deliveryAddressDao;
    @Autowired
    public GradeDao gradeDao;


    //日期转换String-Date
    public Date strToDate(String sDate){
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
    public String datToStr(Date sDate){
        String date;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        date = formatter.format(sDate);
        return  date;
    }



    @Test
    public void dateTest(){
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        ParsePosition pos = new ParsePosition(8);
        Date currentTime_2 = formatter.parse(dateString, pos);
        System.out.println(currentTime_2);
    }

    //add用户
    @Test
    public void insertUser(){
        User user = new User();
        user.setRegDate(new Date());
        user.setAddress("东川路800");
        user.setLatitude(12.1);
        user.setLongitude(21.4);
        user.setGender("女");
        user.setUserName("芙利德");
        user.setPassword("189846230");
        user.setPhoto(" ");
        user.setPhone("05663216");
        user.setValid(true);
        userDao.save(user);
    }

    //生成订单号
    @Test
    public void createOrderId(){
        Date date=new Date();
        DateFormat format = new SimpleDateFormat("yyyyMMdd");
        String time = format.format(date);
        int hashfirst = time.toString().hashCode();
        if(hashfirst<0){
            hashfirst = -hashfirst;
        }
        System.out.println(hashfirst);
        int hashCodeV = UUID.randomUUID().toString().hashCode();
        if (hashCodeV < 0) {//有可能是负数
            hashCodeV = -hashCodeV;
        }
        System.out.println(String.format("011d",hashfirst) + String.format("%011d", hashCodeV));
    }

    //add商品
    @Test
    @Rollback(false)
    public void insertCommodity(){
        Commodity commodity = new Commodity();
        commodity.setInventory(500);
        commodity.setRemaining(100);
        commodity.setPrice(10000);
        commodity.setOnShelves(true);
        commodity.setCommodityInfo("龙鳞楔形石");
        commodityDao.save(commodity);
    }

    //add经销商















}
