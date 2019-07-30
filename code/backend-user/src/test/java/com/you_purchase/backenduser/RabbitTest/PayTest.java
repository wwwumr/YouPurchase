package com.you_purchase.backenduser.RabbitTest;

import com.you_purchase.backenduser.RabbitMq.PaySender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PayTest {
    @Autowired
    private PaySender paySender;

    @Test
    public void payOrder() throws Exception {
        paySender.send(46231);
    }
}
