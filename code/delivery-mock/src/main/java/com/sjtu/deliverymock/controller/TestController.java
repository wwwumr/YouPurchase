package com.sjtu.deliverymock.controller;

import com.sjtu.deliverymock.request.ElemeCreateOrderRequest;
import com.sjtu.deliverymock.response.OrderResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery")
public class TestController {

    @PostMapping("/order")
    public OrderResponse createOrder(@RequestBody ElemeCreateOrderRequest.ElemeCreateRequestData data){
        OrderResponse response = new OrderResponse();
        response.setCode("200");
        response.setMsg("接受成功");
        return response;
    }

    // @PostMapping("/order/query")

}
