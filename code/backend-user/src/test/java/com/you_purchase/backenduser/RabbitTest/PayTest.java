package com.you_purchase.backenduser.RabbitTest;

import com.you_purchase.backenduser.RabbitMq.Sender;
import com.you_purchase.backenduser.RabbitMq.TestOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PayTest {
    /*@Autowired
    private PaySender paySender;
    @Autowired
    private OrderAddSender orderAddSender;*/
    @Autowired
    private Sender sender;

    @Test
    public void payOrder() throws Exception {
        for(int i=1;i<10;i++){
        sender.paySend(i);}
    }

    @Test
    public  void orderAdd() throws Exception{
        TestOrder testOrder = new TestOrder();
        testOrder.setCreateDate("2019-01-01");
        testOrder.setStoreId(2);
        testOrder.setUserId(3);
        testOrder.setTarAddress("祭祀场");
        sender.orderSend(testOrder);
    }
}
