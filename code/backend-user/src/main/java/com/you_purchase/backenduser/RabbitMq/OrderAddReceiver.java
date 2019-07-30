package com.you_purchase.backenduser.RabbitMq;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "orderAdd")
public class OrderAddReceiver {

    @RabbitHandler
    public void process(TestOrder testOrder){
        System.out.println("receiver: "+testOrder.toString());
    }
}
