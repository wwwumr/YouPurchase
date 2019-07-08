package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.OrderCheckDTO;
import com.sjtu.youpurchase.DTO.OrderInfoDTO;
import com.sjtu.youpurchase.entity.OrderInfo;
import com.sjtu.youpurchase.parameter.OrderPostParameter;

import java.util.List;

public interface OrderService {
    //用户查看订单
    List<OrderCheckDTO> UserGetAllOrder(long userId);


    //用户提交订单
    OrderInfoDTO UserOrder(OrderPostParameter orderPostParameter);
}
