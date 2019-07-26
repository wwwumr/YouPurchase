package com.sjtu.deliverymock.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sjtu.deliverymock.request.CreateOrderRequest;
import com.sjtu.deliverymock.request.ElemeCreateOrderRequest;
import com.sjtu.deliverymock.request.ElemeQueryCarrierRequest;
import com.sjtu.deliverymock.request.QueryCarrierRequest;
import com.sjtu.deliverymock.response.CarrierResponse;
import com.sjtu.deliverymock.response.OrderCreateResponse;
import com.sjtu.deliverymock.util.HttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedList;
import java.util.List;

@RestController
public class TestController {

    @Bean
    public ObjectMapper objectMapper(){
        return new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }

    @PostMapping("/order")
    public OrderCreateResponse createOrder(@RequestBody CreateOrderRequest data){
        OrderCreateResponse response = new OrderCreateResponse(new OrderCreateResponse.OrderCreateData());
        System.out.println(data.toString());
        response.setCode("200");
        response.setMsg("接收成功");
        String callbackUrl = data.getNotify_url();
        System.out.println(callbackUrl+"?orderId="+data.getPartner_order_code());
        List<BasicNameValuePair> params = new LinkedList<>();
        params.add(new BasicNameValuePair("orderId",data.getPartner_order_code()));
        HttpClient.get(callbackUrl, params);
        // TODO: 订单接受的回调函数
        return response;
    }

    // @PostMapping("/order/query")

    @PostMapping("/order/carrier")
    public CarrierResponse queryCarrierPosition(@RequestBody QueryCarrierRequest data){
        CarrierResponse response = new CarrierResponse(new CarrierResponse.CarrierData("13900003123",
                "zhangsan",121.421945,31.036094));
        response.setCode("200");
        response.setMsg("接收成功");
        return response;
    }

}
