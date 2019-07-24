package com.you_purchase.backenduser.service;



import com.you_purchase.backenduser.dto.CommodityShortageDTO;
import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.dto.OrderListDTO;
import com.you_purchase.backenduser.dto.OrderPayDTO;
import com.you_purchase.backenduser.entity.Commodity;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.OrderItem;
import com.you_purchase.backenduser.entity.Store;
import com.you_purchase.backenduser.parameter.OrderInfoCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import com.you_purchase.backenduser.parameter.PayParameter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderInfoService extends BaseService {


    //用户新增订单
    public OrderPayDTO addOrder(OrderInfoParameter orderInfoParameter) {
        OrderInfo orderInfo = new OrderInfo();
        List<CommodityShortageDTO> shortageDTOS = new ArrayList<>();
        orderInfo.setOrderInfo(orderInfoParameter);
        long orderInfoId = orderInfo.getOrderInfoId();
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
                shortageDTOS.add(new CommodityShortageDTO(commodity.getCommodityId(), commodity.getRemaining()));
            }
        }
        orderInfoDao.save(orderInfo);
        return new OrderPayDTO(orderInfo, shortageDTOS);
    }

    //用户查看不同执行状态的订单
    public List<OrderInfoDTO> OrderUserCheck(OrderInfoCheckParameter orderInfoCheckParameter) {
        //带有用户id的订单+带有订单id的商品
        List<OrderInfo> orderInfos = orderInfoDao.findByUserIdAndStatusAndValid(orderInfoCheckParameter.getId(), orderInfoCheckParameter.getStatus(), true);
        if (orderInfos == null) {
            return null;
        }
        /*for(int i=0;i<orderInfos.size();i++){
            System.out.println(orderInfos.get(i).getOrderInfoId());
        }*/
  /*      List<OrderInfoDTO> orderInfoDTOS = new ArrayList<>();
        //获取对应用户id的所有订单
        for (OrderInfo s : orderInfos) {
            //System.out.println(s.getOrderInfoId());
            OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
            orderInfoDTO.setStoreId(s.getStoreId());
            orderInfoDTO.setTarPhone(s.getTarPhone());
            orderInfoDTO.setTarAddress(s.getTarAddress());
            orderInfoDTO.setTarPeople(s.getTarPeople());
            orderInfoDTO.setJudged(s.isJudged());
            orderInfoDTO.setCreateDate(s.getCreateDate());
            Store store = storeDao.findByStoreId(s.getStoreId());
            orderInfoDTO.setStoreName(store.getStoreName());
            orderInfoDTO.setTotalPrice(s.getTotalPrice());
            orderInfoDTO.setOrderInfoId(s.getOrderInfoId());
            //获取对应订单id的所有商品
            List<OrderItem> orderItems = orderItemDao.findByOrderInfoId(s.getOrderInfoId());
            List<Commodity> orderItemList = new ArrayList<>();
            for(OrderItem o:orderItems){
                Commodity commodity = new Commodity();
                commodity = commodityDao.findByCommodityId(o.getCommodityId());
                orderItemList.add(commodity);
            }
            orderInfoDTO.setOrderItemList(orderItemList);
            orderInfoDTOS.add(orderInfoDTO);
        }*/
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        if(orderInfos == null){
            return null;
        }
        return orderInfoDTOS;
    }

    //商家查看所有订单
    public List<OrderInfoDTO> OrderStoreCheck(OrderInfoCheckParameter orderInfoCheckParameter) {
        List<OrderInfo> orderInfos = orderInfoDao.findByStoreIdAndValid(orderInfoCheckParameter.getId(), true);
        if (orderInfos == null) {
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        if(orderInfos == null){
            return null;
        }
        return orderInfoDTOS;
    }

    //商家查看不同执行状态的订单
    public List<OrderInfoDTO> OrderStoreStatusCheck(OrderInfoCheckParameter orderInfoCheckParameter){
        List<OrderInfo> orderInfos = orderInfoDao.findByStoreIdAndStatusAndValid(orderInfoCheckParameter.getId(),orderInfoCheckParameter.getStatus(),true);
        if(orderInfos == null){
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = OrderCheck(orderInfos);
        if(orderInfos == null){
            return null;
        }
        return orderInfoDTOS;
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
    public int OrderInfoDelete(long orderInfoId) {
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
                orderInfoDao.save(orderInfo);
                return 200;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 403;
    }

}
