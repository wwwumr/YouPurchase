package com.sjtu.deliverymock.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sjtu.deliverymock.request.ElemeCreateOrderRequest;
import com.sjtu.deliverymock.request.ElemeQueryCarrierRequest;
import com.sjtu.deliverymock.response.CarrierResponse;
import com.sjtu.deliverymock.response.OrderCreateResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery")
public class TestController {

    @Bean
    public ObjectMapper objectMapper(){
        return new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }

    @PostMapping("/order")
    public OrderCreateResponse createOrder(@RequestBody ElemeCreateOrderRequest data){
        OrderCreateResponse response = new OrderCreateResponse(new OrderCreateResponse.OrderCreateData());
        response.setCode("200");
        response.setMsg("接收成功");
        // TODO: 订单接受的回调函数
        return response;
    }

    // @PostMapping("/order/query")

    @PostMapping("/order/carrier")
    public CarrierResponse queryCarrierPosition(@RequestBody ElemeQueryCarrierRequest data){
        CarrierResponse response = new CarrierResponse(new CarrierResponse.CarrierData("13900003123",
                "zhangsan",120.312,40.32));
        response.setCode("200");
        response.setMsg("接收成功");
        return response;
    }

}
