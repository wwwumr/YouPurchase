package com.you_purchase.backenduser.controller;


import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.dto.OrderPayDTO;
import com.you_purchase.backenduser.parameter.OrderInfoCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoDateCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import com.you_purchase.backenduser.parameter.PayParameter;
import com.you_purchase.backenduser.service.OrderInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;
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
    int OrderPay(@RequestBody PayParameter payParameter){
        return orderInfoService.OrderPay(payParameter);
    }

    //用户查看订单
    @RequestMapping(value = "/order/userCheck",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看所有订单")
    List<OrderInfoDTO> OrderUserCheck(@RequestBody OrderInfoCheckParameter orderInfoCheckParameter){
        return orderInfoService.OrderUserCheck(orderInfoCheckParameter);
    }

    //用户查状态看订单
    @RequestMapping(value = "/order/userStatusCheck",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看状态订单")
    List<OrderInfoDTO> OrderUserStatusCheck(@RequestBody OrderInfoCheckParameter orderInfoCheckParameter){
        System.out.println(orderInfoCheckParameter.getId());
        return orderInfoService.OrderUserStatusCheck(orderInfoCheckParameter);
    }

    //商家查看所有订单
    @RequestMapping(value = "/order/storeCheck",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "商户查看订单")
    List<OrderInfoDTO> OrderStoreCheck(HttpSession session){
        if(session.getAttribute("storeId") == null){
            return null;
        }
        long storeId = (long) session.getAttribute("storeId");

        return orderInfoService.OrderStoreCheck(storeId);
    }

    //商家查看不同状态订单
    @RequestMapping(value = "/order/storeStatusCheck",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "商家查看不同状态订单")
    List<OrderInfoDTO> OrderStoreStatusCheck(int status,HttpSession session){
        if(session.getAttribute("storeId")==null){
            return null;
        }
        long storeId = (long) session.getAttribute("storeId");
        return orderInfoService.OrderStoreStatusCheck(storeId,status);
    }

    //商家查看指定时间段的订单
    @RequestMapping(value = "/order/storeTimeCheck",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "商家查看指定时段的订单")
    List<OrderInfoDTO> OrderStoreDateCheck(@RequestBody OrderInfoDateCheckParameter orderInfoDateCheckParameter, HttpSession session){
        if(session.getAttribute("storeId")==null){
            return null;
        }
        long storeId = (long) session.getAttribute("storeId");
        return orderInfoService.OrderStoreDateCheck(orderInfoDateCheckParameter,storeId);
    }

    //根据订单id查看订单
    @RequestMapping(value = "/order/check",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "根据id查看订单" )
    OrderInfoDTO OrderInfoCheck(long orderInfoId, HttpSession session){
        if(session.getAttribute("storeId")==null){
            return null;
        }
        long storeId = (long) session.getAttribute("storeId");
        return orderInfoService.OrderInfoCheck(orderInfoId,storeId);
    }

    //商家修改订单状态
    @RequestMapping(value = "/order/modify",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "商户修改订单状态")
    int OrderInfoModify(long orderInfoId,int status,HttpSession session){
        if(session.getAttribute("storeId")==null){
            return 403;
        }
        long storeId = (long) session.getAttribute("storeId");
        return  orderInfoService.OrderInfoModify(orderInfoId,status);
    }

    //订单取消
    @RequestMapping(value = "/order/delete",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "删除订单")
    int OrderInfoDelete(long orderInfoId,HttpSession session){
        if(session.getAttribute("storeId")==null){
            return 403;
        }
        long storeId = (long) session.getAttribute("storeId");
        return orderInfoService.OrderInfoDelete(orderInfoId,storeId);
    }
}
