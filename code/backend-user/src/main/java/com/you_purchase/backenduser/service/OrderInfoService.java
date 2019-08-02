package com.you_purchase.backenduser.service;



import com.you_purchase.backenduser.dto.*;
import com.you_purchase.backenduser.entity.Commodity;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.OrderItem;
import com.you_purchase.backenduser.entity.Store;
import com.you_purchase.backenduser.parameter.OrderInfoCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoDateCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import com.you_purchase.backenduser.parameter.PayParameter;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderInfoService extends BaseService {


    //用户新增订单
    public OrderPayDTO addOrder(OrderInfoParameter orderInfoParameter) {
        OrderInfo orderInfo = new OrderInfo();
        List<CommodityShortageDTO> shortageDTOS = new ArrayList<>();
        Date date = new Date();
        String sDate = datToStr(date);
        Date trueDate = strToDate(sDate);
        String orderNo = createOrderId();
        orderInfo.setOrderInfo(orderInfoParameter,trueDate,orderNo);
        orderInfoDao.save(orderInfo);
        long orderInfoId = orderInfo.getOrderInfoId();
        System.out.println("获取订单id");
        System.out.println(orderInfoId);
        for (OrderListDTO s : orderInfoParameter.getOrderItemList()) {
            Commodity commodity = commodityDao.getCommodityByCommodityId(s.getCommodityId());
            Integer amount = s.getAmount();
            if (commodity.getRemaining() >= amount) {
                OrderItem orderItem = new OrderItem();
                orderItem.setAmount(s.getAmount());
                orderItem.setCommodityId(s.getCommodityId());
                orderItem.setPrice(s.getPrice());
                orderItem.setOrderInfoId(orderInfoId);
                orderItemDao.save(orderItem);
                commodity.setRemaining(commodity.getRemaining() - amount);
                commodity.setInventory(commodity.getInventory() - amount);
                commodityDao.save(commodity);
            } else {
                shortageDTOS.add(new CommodityShortageDTO(commodity.getCommodityId(), commodity.getCommodityInfo(), commodity.getRemaining()));
            }
        }

        return new OrderPayDTO(orderInfo, shortageDTOS,sDate);
    }

    //用户查看不同执行状态的订单
    public List<OrderInfoDTO> OrderUserStatusCheck(OrderInfoCheckParameter orderInfoCheckParameter) {
        //带有用户id的订单+带有订单id的商品
        List<OrderInfo> orderInfos = orderInfoDao.findByUserIdAndStatusAndValid(orderInfoCheckParameter.getId(), orderInfoCheckParameter.getStatus(), true);
        if (orderInfos == null) {
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        return orderInfoDTOS;
    }


    //用户查看所有订单
    public List<OrderInfoDTO> OrderUserCheck(OrderInfoCheckParameter orderInfoCheckParameter){
        List<OrderInfo> orderInfos = orderInfoDao.findByUserIdAndValid(orderInfoCheckParameter.getId(),true);
        if(orderInfos ==null){
            return null;
        }
        System.out.println("准备开始获取数据");
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        return orderInfoDTOS;
    }


    //商家查看所有订单
    public List<OrderInfoDTO> OrderStoreCheck(long storeId) {
        System.out.println("id"+storeId);
        List<OrderInfo> orderInfos = orderInfoDao.findByStoreIdAndValid(storeId, true);
        if (orderInfos == null) {
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        return orderInfoDTOS;
    }

    //商家查看不同执行状态的订单
    public List<OrderInfoDTO> OrderStoreStatusCheck(long storeId,int status){
        List<OrderInfo> orderInfos = orderInfoDao.findByStoreIdAndStatusAndValid(storeId,status,true);
        if(orderInfos == null){
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        return orderInfoDTOS;
    }

    //商家查看不同日期段内的订单
    public List<OrderInfoDTO> OrderStoreDateCheck(OrderInfoDateCheckParameter orderInfoDateCheckParameter,long storeId){
        String start = orderInfoDateCheckParameter.getsDate();
        String end = orderInfoDateCheckParameter.geteDate();
        if(isLegalDate(start) == false){
            return null;
        }
        if(isLegalDate(end) == false){
            return null;
        }
        Date sDate = strToDate(start);
        Date eDate = strToDate(end);
        List<OrderInfo> orderInfos = orderInfoDao.findByStoreIdAndCreateDateIsGreaterThanEqualAndCreateDateIsLessThanEqual(storeId,sDate,eDate);
        if(orderInfos == null){
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        return  orderInfoDTOS;
    }

    //查询单个订单
    public OrderInfoDTO OrderInfoCheck(long orderInfoId,long storeId){
        boolean flag = orderBelong(orderInfoId,storeId);
        if(flag == false){
            return null;
        }
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId,true);
        OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
        orderInfoDTO.setStoreId(orderInfo.getStoreId());
        orderInfoDTO.setStatus(orderInfo.getStatus());
        orderInfoDTO.setOrderNo(orderInfo.getOrderInfoNo());
        orderInfoDTO.setTarPhone(orderInfo.getTarPhone());
        orderInfoDTO.setTarAddress(orderInfo.getTarAddress());
        orderInfoDTO.setTarPeople(orderInfo.getTarPeople());
        orderInfoDTO.setJudged(orderInfo.isJudged());
        String date = datToStr(orderInfo.getCreateDate());
        orderInfoDTO.setCreateDate(date);
        Store store = storeDao.findByStoreId(orderInfo.getStoreId());
        orderInfoDTO.setStoreName(store.getStoreName());
        orderInfoDTO.setTotalPrice(orderInfo.getTotalPrice());
        orderInfoDTO.setOrderInfoId(orderInfo.getOrderInfoId());
        //获取对应订单id的所有商品
        List<OrderItem> orderItems = orderItemDao.findByOrderInfoId(orderInfo.getOrderInfoId());
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
        return orderInfoDTO;
    }


    //店家修改订单执行状态
    public int OrderInfoModify(long orderInfoId, int status) {
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId, true);
        if (orderInfo == null) {
            //System.out.println("不存在该订单");
            return 403;
        }
        orderInfo.setStatus(status);
        orderInfoDao.save(orderInfo);
        return 200;
    }

    //取消订单
    public int OrderInfoDelete(long orderInfoId,long id) {
        boolean flag = orderBelong(orderInfoId,id);
        if(flag==false){
            return 0;
        }
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId, true);
        if (orderInfo == null) {
            //System.out.println("不存在该订单");
            return 403;
        }
        orderInfo.setValid(false);
        return 200;
    }



    //用户支付订单
    private String apiUrl = "weixin";
    private String appId = "287613";
    private String appSecret = "dj812-ej192-d912-d19dn291";
    public int OrderPay(PayParameter payParameter) {
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(payParameter.getPayId(), true);
        if (orderInfo == null) {
            return 403;
        }
        try {
            //第三方支付
            Weixin client = new Weixin(apiUrl, appId, appSecret);
            String result = client.send(payParameter);
            if (result.equals("success")) {
                orderInfo.setStatus(1);
                //支付完成后将订单支付消息推送到队列
                sender.paySend(payParameter.getPayId());
                orderInfoDao.save(orderInfo);
                return 200;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 403;
    }

}
