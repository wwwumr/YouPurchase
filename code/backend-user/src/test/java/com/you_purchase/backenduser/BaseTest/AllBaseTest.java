package com.you_purchase.backenduser.BaseTest;



//User底层逻辑测试
import com.you_purchase.backenduser.dao.*;
import com.you_purchase.backenduser.dto.OrderCheckDTO;
import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.entity.*;
import com.you_purchase.backenduser.service.BaseService;
import com.you_purchase.backenduser.service.OrderInfoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
        if (hashCodeV < 0) {
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

    @Test
    @Rollback(false)
    public void insertOrder(){
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderInfoNo("d1hdhd89128dh19");
        orderInfo.setStatus(1);
        orderInfo.setUserId(1);
        orderInfo.setValid(true);
        orderInfo.setJudged(true);
        orderInfo.setTotalPrice(2423);
        orderInfo.setStoreId(1);
        orderInfo.setCreateDate(new Date());
        orderInfo.setDeliveryAddressId(1L);
        orderInfo.setTarAddress("dasd");
        orderInfo.setTarPeople("dad");
        orderInfo.setTarPhone("498454");
        orderInfoDao.save(orderInfo);
    }

    @Test
    @Rollback(false)
    public void insertOrderItem(){
        OrderItem orderItem = new OrderItem();
        orderItem.setOrderInfoId(14);
        orderItem.setCommodityId(6);
        orderItem.setAmount(5);
        orderItem.setPrice(5000.0);
        orderItemDao.save(orderItem);
    }


    //add经销商


    @Autowired
    private OrderInfoService orderInfoService;

    public List<OrderInfoDTO> OrderCheck(List<OrderInfo> orderInfos){
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
            orderInfoDTO.setStoreName(store.getStoreName());
            orderInfoDTO.setTotalPrice(s.getTotalPrice());
            orderInfoDTO.setOrderInfoId(s.getOrderInfoId());
            System.out.println("订单信息获取完毕");
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


    @Test
    @Rollback(false)
    public void insertDelivery(){
        DeliveryAddress deliveryAddress = new DeliveryAddress();
        deliveryAddress.setLatitude(10.0);
        deliveryAddress.setLongitude(10.0);
        deliveryAddressDao.save(deliveryAddress);
    }

    @Test
    @Rollback(false)
    public void insertStore(){
        Store store = new Store();
        store.setLongitude(10.0);
        store.setLongitude(10.0);
        store.setStoreName("dasfas");
        store.setDeliveryRange(100.0);
        store.setAttached(true);
        store.setContact("4984654");
        store.setAddress("adsiasi");
        storeDao.save(store);
    }













}
