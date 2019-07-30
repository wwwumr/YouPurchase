package com.example.rabbittest;

import org.junit.Test;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

public class SenderTest extends RabbitTestApplicationTests {

    @Autowired
    private AmqpTemplate amqpTemplate;

    @Test
    public void send2(){
        amqpTemplate.convertAndSend("myQueue2", "2 now " + new Date());
    }

    @Test
    public void send3(){
        amqpTemplate.convertAndSend("myQueue3", "3 now " + new Date());
    }

    @Test
    public void send4() {
        amqpTemplate.convertAndSend("myQueue4", 1234L);
    }
}
