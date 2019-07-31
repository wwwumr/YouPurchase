package com.you_purchase.backenduser.service;

import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService extends BaseService {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue("delivery-queue"),
            exchange = @Exchange("deliveryExChange")
    ))
    public void deliveryAfterPay(Long orderId){

    }
}
