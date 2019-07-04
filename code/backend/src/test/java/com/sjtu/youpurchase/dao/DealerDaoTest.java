package com.sjtu.youpurchase.dao;

import com.sjtu.youpurchase.entity.Dealer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

/**
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DealerDaoTest {

    @Autowired
    private DealerDao dealerDao;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(dealerDao);
    }

    @Test
    public void testGetAllDealers() throws Exception {
        List<Dealer> list = dealerDao.getAllDealers();
//        Assert.assertEquals(list.size(),0);
        Assert.assertNotNull(list);
        System.out.println(list);
    }

    @Test
    public void testGetADealerByDealerId() throws Exception {
        // assume that we have a data line in the database
        // Dealer("123", "dadsa", "czcxz", "cxzczx", "xczcx", "xczc")

        Dealer dealer = dealerDao.getDealerById(123L);
        Assert.assertEquals(dealer.getUserName(), "xczc");
        Assert.assertEquals(dealer.getRealName(), "xczcx");
        Assert.assertEquals(dealer.getContact(), "czcxz");
    }

    @Test
    public void testAddADealerAndUpdate() throws Exception {
        Dealer dealer = new Dealer();
        dealer.setUserName("testun");
        dealer.setAddress("addr");
        dealer.setContact("123456");
        dealer.setRealName("real");
        dealer.setPassword("123456");

        dealerDao.addADealer(dealer);

        System.out.println(dealer.getDealerId());

        dealer.setRealName("changedReal");
        dealer.setUserName("changedUser");
        dealerDao.updateDealer(dealer);
    }


}