package com.you_purchase.backenduser.RabbitMq;

import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import com.you_purchase.backenduser.service.OrderInfoService;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Receiver {


    @Autowired
    private OrderInfoService orderInfoService;



    @RabbitHandler
    @RabbitListener(queues = "orderAdd")
    public void process(OrderInfoParameter orderInfoParameter){
        orderInfoService.addOrder(orderInfoParameter);
        System.out.println("receiver: "+orderInfoParameter.toString());
    }
}
