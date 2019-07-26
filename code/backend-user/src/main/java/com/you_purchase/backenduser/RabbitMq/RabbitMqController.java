package com.you_purchase.backenduser.RabbitMq;

import com.you_purchase.backenduser.parameter.GradeParameter;
import io.swagger.annotations.ApiOperation;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.you_purchase.backenduser.RabbitMq.RabbitConfig;

@RestController
public class RabbitMqController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/rabbit/grade/add",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "rabbit增加用户")
    int addGrade(@RequestBody GradeParameter gradeParameter){
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGEGRADE);
        return 200;
    }
}
