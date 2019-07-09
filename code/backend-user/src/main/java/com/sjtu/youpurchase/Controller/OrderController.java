package com.sjtu.youpurchase.Controller;

import com.sjtu.youpurchase.DTO.OrderCheckDTO;
import com.sjtu.youpurchase.DTO.OrderInfoDTO;
import com.sjtu.youpurchase.parameter.OrderPostParameter;
import com.sjtu.youpurchase.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

public class OrderController {
    @Autowired
    OrderService orderService;


    //用户下订单
    @RequestMapping(value = "order/order",method = RequestMethod.POST)
    public
    @ResponseBody
    OrderInfoDTO UserOrder(@RequestBody OrderPostParameter orderPostParameter){
        return orderService.UserOrder(orderPostParameter);
    }

    //用户查看订单
    @RequestMapping(value = "order/userCheck",method = RequestMethod.GET )
    public
    @ResponseBody
    List<OrderCheckDTO> UserGetAllOrder(long userId){return orderService.UserGetAllOrder(userId);}


}
