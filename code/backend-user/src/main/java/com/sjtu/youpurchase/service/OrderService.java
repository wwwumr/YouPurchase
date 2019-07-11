package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.OrderCheckDTO;
import com.sjtu.youpurchase.DTO.OrderInfoDTO;
import com.sjtu.youpurchase.entity.OrderInfo;
import com.sjtu.youpurchase.parameter.OrderPostParameter;
import com.sjtu.youpurchase.utils.Constrain;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService extends BaseService {
    //用户查看订单
    public List<OrderCheckDTO> UserGetAllOrder(long userId){
        List<OrderCheckDTO> orderCheckDTOS = orderInfoDao.findByUserIdAndValid(userId,true);
        if(orderCheckDTOS == null){
            Constrain.log("没有订单");
            return null;
        }
        return orderCheckDTOS;
    }


    //用户提交订单
    public OrderInfoDTO UserOrder(OrderPostParameter orderPostParameter){
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderInfo(orderPostParameter);
        orderInfoDao.save(orderInfo);
        return new OrderInfoDTO(orderInfo);
    }
}
