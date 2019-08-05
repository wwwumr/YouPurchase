package com.you_purchase.backenduser.RabbitMq;

import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = "rabbit接口")
public class RabbitController {

    @Autowired
    private Sender sender;

    /*@RequestMapping(value = "/rabbit/test",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "rabbit测试接口")
    String rabbitTest(@RequestBody TestOrder testOrder){
        System.out.println("testOrder:"+testOrder.getUserId());
        sender.orderSend(testOrder);
        return "success";
    }*/

    @RequestMapping(value = "/rabbit/addOrder",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "rabbit增加订单")
    String rabbitAddOrder(@RequestBody List<OrderInfoParameter> orderInfoParameter){
        //System.out.println(orderInfoParameter.getCreateDate());
        sender.orderSend(orderInfoParameter);
        return "success";
    }
}
