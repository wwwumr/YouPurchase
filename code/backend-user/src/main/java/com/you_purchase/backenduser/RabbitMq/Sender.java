package com.you_purchase.backenduser.RabbitMq;

import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Sender {
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void paySend(long id) {
        String context = "订单为" + id + "的订单已经支付完成了";
        System.out.println("Sender : " + context);
        this.amqpTemplate.convertAndSend("pay", id);
    }

    public void orderSend(List<OrderInfoParameter> orderInfoParameters){
        //System.out.println("sender: "+orderInfoParameters.getCreateDate());
        this.amqpTemplate.convertAndSend("orderAdd",orderInfoParameters);
    }
}
