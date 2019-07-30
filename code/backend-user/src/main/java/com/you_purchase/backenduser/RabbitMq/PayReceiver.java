package com.you_purchase.backenduser.RabbitMq;


import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


//获取订单支付完成的消息
@Component
public class PayReceiver {


    @RabbitHandler
    @RabbitListener(queues = "pay")
    public void process(Long id) {
        System.out.println("receiver" + id);
    }
}
