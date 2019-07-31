package com.you_purchase.backenduser.RabbitMq;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Receiver {

    @RabbitHandler
    @RabbitListener(queues = "pay")
    public void payReceiver(Long id) {
        System.out.println("receiver" + id);
    }

    @RabbitHandler
    @RabbitListener(queues = "orderAdd")
    public void process(TestOrder testOrder){
        System.out.println("receiver: "+testOrder.toString());
    }
}
