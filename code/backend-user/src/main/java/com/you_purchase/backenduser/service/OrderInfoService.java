package com.you_purchase.backenduser.service;

import com.you_purchase.backenduser.dto.OrderCheckDTO;
import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.parameter.OrderCheckParameter;
import com.you_purchase.backenduser.parameter.OrderModifyParameter;
import com.you_purchase.backenduser.parameter.OrderParameter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderInfoService extends BaseService{
    //用户新增订单
    public OrderInfoDTO OrderAdd(OrderParameter orderParameter){
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderInfo(orderParameter);
        orderInfoDao.save(orderInfo);
        return new OrderInfoDTO(orderInfo);
    }
    //查看订单
    public List<OrderCheckDTO> OrderCheck(OrderCheckParameter orderCheckParameter){
        List<OrderInfo> orderInfos = orderInfoDao.findByUserIdAndStatusAndValid(orderCheckParameter.getId(),orderCheckParameter.getStatus(),true);
        List<OrderCheckDTO> orderCheckDTOS = new ArrayList<>();
        for(OrderInfo s : orderInfos){
            OrderCheckDTO orderCheckDTO = new OrderCheckDTO();
            orderCheckDTO.setAmount(s.getAmount());
            orderCheckDTO.setCreateDate(s.getCreateDate());
            orderCheckDTO.setOrderInfoId(s.getOrderInfoId());
            orderCheckDTO.setOrderIteName(s.getOrderIteName());
            orderCheckDTO.setPrice(s.getPrice());
            orderCheckDTO.setStatus(s.getStatus());
            orderCheckDTO.setStoreName(s.getStoreName());
            orderCheckDTO.setTotalPrice(s.getTotalPrice());
            orderCheckDTO.setUserName(s.getUserName());
            orderCheckDTOS.add(orderCheckDTO);
        }
        return orderCheckDTOS;

    }
    //商家修改订单状态
    public int  OrderModify(OrderModifyParameter orderModifyParameter){
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderModifyParameter.getOrderInfoId(),true);
        if(orderInfo == null){
            return 403;
        }
        orderInfo.setStatus(orderModifyParameter.getStatus());
        orderInfoDao.save(orderInfo);
        return 200;
    }

    //取消订单
    public int OrderCancle(long orderInfoId){
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId,true);
        if(orderInfo == null){
            return 403;
        }
        orderInfo.setValid(false);
        orderInfoDao.save(orderInfo);
        return 200;
    }

}
