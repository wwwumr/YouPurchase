package com.you_purchase.backenduser.RabbitMq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    //支付完成后将消息推送给商家
    //队列申明
    @Bean
    public Queue payFinish() {
        return new Queue("pay");
    }
    //交换机申明
    @Bean
    public FanoutExchange payExchange(){
        return new FanoutExchange("payExchange");
    }
    //绑定
    @Bean
    public Binding payBinding(){
        return BindingBuilder.bind(payFinish()).to(payExchange());
    }

    //订单管理队列
    @Bean
    public Queue orderAdd(){
        return new Queue("orderAdd");
    }
    @Bean
    public FanoutExchange orderExchange(){
        return new FanoutExchange("orderExchange");
    }
    @Bean
    public Binding orderBinding(){
        return BindingBuilder.bind(orderAdd()).to(orderExchange());
    }


}