package com.example.rabbittest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Component
public class Receiver {

    private static final Logger log = LoggerFactory.getLogger(RabbitmqConfig.class);


    @RabbitListener(queuesToDeclare = @Queue("myQueue2"))
    public void process2(String message){
        log.info("MqReceiver2: {}", message);

    }

    //3. 自动创建队列，Exchange 与 Queue绑定
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue("myQueue3"),
            exchange = @Exchange("testExChange")
    ))
    public void process3(String message){
        log.info("MqReceiver3: {}", message);
    }

    @RabbitListener(queuesToDeclare = @Queue("myQueue4"))
    public void process4(Long orderId){
        System.out.println(orderId);
    }

}
