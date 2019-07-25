package com.you_purchase.backenduser.RabbitMQ;


import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;


//消息生产者
@Component
public class Send {
    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send(){
        String context = "hello" +new Date();
        System.out.println("Sender:" + context);
        this.rabbitTemplate.convertAndSend("hello",context);
    }
}
