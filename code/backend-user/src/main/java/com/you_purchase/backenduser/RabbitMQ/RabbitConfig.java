package com.you_purchase.backenduser.RabbitMq;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;


@Configuration
public class RabbitConfig {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${spring.rabbitmq.host}")
    private String host;

    @Value("${spring.rabbitmq.port}")
    private int port;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;


    @Bean
    public ConnectionFactory connectionFactory(){
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(host,port);
        connectionFactory.setPassword(password);
        connectionFactory.setUsername(username);
        connectionFactory.setVirtualHost("youPurchase");
        connectionFactory.setPublisherConfirms(true);
        return connectionFactory;
    }

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public RabbitTemplate rabbitTemplate(){
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
        return template;
    }

    public static final String QUEUEGRADEADD="addGradeExchange";
    public static final String EXCHANGEGRADE="addGradeExchange";
    @Bean
    public Queue userAdd(){
        Queue queue = new Queue(QUEUEGRADEADD);
        return queue;
    }
    @Bean
    public DirectExchange userExchange(){
        DirectExchange directExchange = new DirectExchange(EXCHANGEGRADE);
        return directExchange;
    }
    @Bean
    public Binding userBinding(){
        Binding binding = BindingBuilder.bind(userAdd()).to(userExchange()).with("addUser");
        return binding;
    }

}
