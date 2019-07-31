package com.you_purchase.backenduser.RabbitMq;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Sender {
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void paySend(long id) {
        String context = "订单为" + id + "的订单已经支付完成了";
        System.out.println("Sender : " + context);
        this.amqpTemplate.convertAndSend("pay", id);
    }

    public void orderSend(TestOrder testOrder){
        System.out.println("sender: "+testOrder.toString());
        this.amqpTemplate.convertAndSend("orderAdd",testOrder);
    }
}
