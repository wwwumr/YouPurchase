package com.you_purchase.backenduser.RabbitMq;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    //支付完成后将消息推送给商家的队列
    @Bean
    public Queue payFinish() {
        return new Queue("pay");
    }




}