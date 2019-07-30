package com.you_purchase.backenduser.RabbitMq;


import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


//获取订单支付完成的消息
@Component
@RabbitListener(queues = "pay")
public class PayReceiver {


    @RabbitHandler
    public void process(Long id) {
        System.out.println(id);
    }
}
