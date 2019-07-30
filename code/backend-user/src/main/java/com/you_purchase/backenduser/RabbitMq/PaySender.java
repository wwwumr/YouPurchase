package com.you_purchase.backenduser.RabbitMq;


import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



//发送订单支付完成的消息
@Component
public class PaySender {


    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send(long id) {
        //String context = "订单为" + id + "的订单已经支付完成了";
        //System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("pay", id);
    }

}
