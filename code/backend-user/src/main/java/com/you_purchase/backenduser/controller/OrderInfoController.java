package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.dto.OrderCheckDTO;
import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.parameter.OrderCheckParameter;
import com.you_purchase.backenduser.parameter.OrderModifyParameter;
import com.you_purchase.backenduser.parameter.OrderParameter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderInfoController extends BaseController{
    //新增订单
    @RequestMapping(value = "/order/add",method = RequestMethod.POST)
    public
    @ResponseBody
    OrderInfoDTO OrderAdd(@RequestBody OrderParameter orderParameter){
        return orderInfoService.OrderAdd(orderParameter);
    }
    //订单查询
    @RequestMapping(value = "/order/check",method = RequestMethod.POST)
    public
    @ResponseBody
    List<OrderCheckDTO> OrderCheckByUser(@RequestBody OrderCheckParameter orderCheckParameter){
        return orderInfoService.OrderCheck(orderCheckParameter);
    }
    //订单执行状态修改
    @RequestMapping(value = "/order/modify",method = RequestMethod.POST)
    public
    @ResponseBody
    int  OrderModify(@RequestBody OrderModifyParameter orderModifyParameter){
        return orderInfoService.OrderModify(orderModifyParameter);
    }
    //订单取消
    @RequestMapping(value = "/order/delete",method = RequestMethod.GET)
    public
    int OrderCancle(long orderInfoId){
        return  orderInfoService.OrderCancle(orderInfoId);
    }
}
