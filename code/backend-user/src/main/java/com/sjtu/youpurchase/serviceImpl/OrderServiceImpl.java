package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.OrderCheckDTO;
import com.sjtu.youpurchase.DTO.OrderInfoDTO;
import com.sjtu.youpurchase.Dao.OrderInfoDao;
import com.sjtu.youpurchase.entity.OrderInfo;
import com.sjtu.youpurchase.parameter.OrderPostParameter;
import com.sjtu.youpurchase.service.OrderService;
import com.sjtu.youpurchase.utils.Constrain;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class OrderServiceImpl implements OrderService{
    @Autowired
    OrderInfoDao orderInfoDao;

    //用户查看订单
    public List<OrderCheckDTO> UserGetAllOrder(long userId){
        List<OrderCheckDTO> orderCheckDTOS = orderInfoDao.findByUserIdAndValid(userId,true);
        if(orderCheckDTOS == null){
            Constrain.log("没有订单");
            return null;
        }
        return orderCheckDTOS;
    }

    //用户下订单
    public OrderInfoDTO UserOrder(OrderPostParameter orderPostParameter){
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderInfo(orderPostParameter);
        orderInfoDao.save(orderInfo);
        return new OrderInfoDTO(orderInfo);
    }

}
