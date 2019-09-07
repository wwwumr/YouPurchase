package com.you_purchase.backenduser.service;

import com.alibaba.fastjson.JSONObject;
import org.junit.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

/**
 * 测试配送mock创建订单
 *
 * @author Chuyuxuan
 */
public class DeliveryAddressServiceTest {

    @Test
    public void thirdDeliveryAfterPay() {
        RestTemplate restTemplate = new RestTemplate();
        JSONObject json = new JSONObject();
        json.put("partner_order_code", "233");
        json.put("notify_url", "http://localhost:9000/delivery");
        json.put("receiver_name", "david");
        json.put("receiver_phone", "020-1111");
        json.put("receiver_address", "address_rec");
        json.put("receiver_longitude", 120.001);
        json.put("receiver_latitude", 40.001);
        json.put("transport_name", "kfc");
        json.put("transport_address", "jiangchuanlu");
        json.put("transport_tel", "020-2222");
        json.put("transport_longitude", 121.001);
        json.put("transport_latitude", 121.002);
        String postUrl = "http://localhost:9002/order";
        ResponseEntity<JSONObject> response = restTemplate.postForEntity(postUrl, json, JSONObject.class);
        System.out.println(response);
    }

}

