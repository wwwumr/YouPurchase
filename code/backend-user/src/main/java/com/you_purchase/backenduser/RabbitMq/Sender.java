package com.you_purchase.backenduser.RabbitMq;

import com.you_purchase.backenduser.parameter.OrderInfoParameter;
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

    public void orderSend(OrderInfoParameter orderInfoParameter){
        System.out.println("sender: "+orderInfoParameter.getCreateDate());
        this.amqpTemplate.convertAndSend("orderAdd",orderInfoParameter);
    }
}
