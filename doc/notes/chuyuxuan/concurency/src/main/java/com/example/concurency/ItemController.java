package com.example.concurency;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemController {

    private static final Logger log = LoggerFactory.getLogger(ItemController.class);

    @Autowired
    private AmqpTemplate amqpTemplate;

    @GetMapping("/item/mq")
    public String decreaseItem(@RequestParam("itemId")Long itemId, @RequestParam("number")Integer number){
        log.info("receive request; itemId: {}, number: {}", itemId, number);
        amqpTemplate.convertAndSend("myQueue3", new ItemInfo(itemId, number));
        return "ok";
    }
}
