package com.example.concurency;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    private static final Logger log = LoggerFactory.getLogger(ItemService.class);

    @Autowired
    private ItemRepostory itemRepostory;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue("myQueue3"),
            exchange = @Exchange("testExChange")
    ))
    public void process3(ItemInfo itemInfo){
        log.info("MqReceiver3: {}", itemInfo);
        Item item = itemRepostory.findById(itemInfo.getItemId()).get();
        if(item.getRemaining()>=itemInfo.getNumber()){
            item.setRemaining(item.getRemaining()-itemInfo.getNumber());
            log.info("remaining: {}", item.getRemaining());
            itemRepostory.save(item);
        } else {
            log.info("not enough");
        }
    }
}
