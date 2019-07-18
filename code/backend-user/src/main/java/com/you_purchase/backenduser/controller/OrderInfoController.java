package com.you_purchase.backenduser.controller;


import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.dto.OrderPayDTO;
import com.you_purchase.backenduser.parameter.OrderInfoCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import com.you_purchase.backenduser.parameter.PayParameter;
import com.you_purchase.backenduser.service.OrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = "订单接口相关")
public class OrderInfoController extends BaseController{

    //用户新增订单
    @RequestMapping(value = "/order/add",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户新增订单")
    OrderPayDTO addOrder(@RequestBody OrderInfoParameter orderInfoParameter){
        return orderInfoService.addOrder(orderInfoParameter);
    }

    //用户支付订单
    @RequestMapping(value = "/order/pay",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户支付订单")
    boolean OrderPay(@RequestBody  PayParameter payParameter){
        return orderInfoService.OrderPay(payParameter);
    }

    //模拟第三方接口,确认具体支付方式后删除
    @RequestMapping(value = "/order/thirdPay",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "第三方模拟接口")
    PayParameter ThirdPay(@RequestBody PayParameter payParameter){
        return orderInfoService.ThirdPay(payParameter);
    }


    //用户查看订单
    @RequestMapping(value = "/order/userCheck",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看订单")
    List<OrderInfoDTO> OrderUserCheck(@RequestBody OrderInfoCheckParameter orderInfoCheckParameter){
        return orderInfoService.OrderUserCheck(orderInfoCheckParameter);
    }

    //商家查看订单
    @RequestMapping(value = "/order/storeCheck",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "商户查看订单")
    List<OrderInfoDTO> OrderStoreCheck(@RequestBody OrderInfoCheckParameter orderInfoCheckParameter){
        return orderInfoService.OrderStoreCheck(orderInfoCheckParameter);
    }

    //商家修改订单状态
    @RequestMapping(value = "/order/modify",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "商户修改订单状态")
    int OrderInfoModify(long orderInfoId,int status){
        return  orderInfoService.OrderInfoModify(orderInfoId,status);
    }

    //订单取消
    @RequestMapping(value = "/order/delete",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "删除订单")
    int OrderInfoDelete(long orderInfoId){
        return orderInfoService.OrderInfoDelete(orderInfoId);
    }
}
