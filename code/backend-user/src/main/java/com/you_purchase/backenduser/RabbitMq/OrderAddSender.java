package com.you_purchase.backenduser.RabbitMq;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderAddSender {
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void send(TestOrder testOrder){
        System.out.println("sender: "+testOrder.toString());
        this.amqpTemplate.convertAndSend(testOrder);
    }

}
