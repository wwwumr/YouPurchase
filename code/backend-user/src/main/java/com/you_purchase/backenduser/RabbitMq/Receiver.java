package com.you_purchase.backenduser.RabbitMq;

import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import com.you_purchase.backenduser.service.OrderInfoService;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Receiver {


    @Autowired
    private OrderInfoService orderInfoService;

    @RabbitHandler
    @RabbitListener(queues = "pay")
    public void payReceiver(Long id) {
        System.out.println("receiver" + id);
    }



    @RabbitHandler
    @RabbitListener(queues = "orderAdd")
    public void process(List<OrderInfoParameter> orderInfoParameters){
        orderInfoService.addOrder(orderInfoParameters);
        //System.out.println("receiver: "+orderInfoParameters.toString());
    }
}
