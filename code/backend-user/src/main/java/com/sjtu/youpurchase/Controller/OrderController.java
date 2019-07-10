package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.DTO.OrderCheckDTO;
import com.sjtu.youpurchase.DTO.OrderInfoDTO;
import com.sjtu.youpurchase.parameter.OrderPostParameter;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
public class OrderController extends BaseController{



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
