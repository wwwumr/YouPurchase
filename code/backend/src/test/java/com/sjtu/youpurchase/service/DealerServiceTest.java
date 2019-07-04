package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.parameter.DealerParameter;
import com.sjtu.youpurchase.dao.DealerDao;
import com.sjtu.youpurchase.entity.Dealer;
import com.sjtu.youpurchase.entity.Store;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

import static org.mockito.BDDMockito.given;

/**
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@WebMvcTest(DealerService.class)
@AutoConfigureMockMvc
public class DealerServiceTest {

    @MockBean
    private DealerDao dealerDao;

    @Autowired
    private DealerService dealerService;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(dealerService);
    }

    @Test
    public void testGetAllDealers() throws Exception {
        Dealer dealer = new Dealer();
        dealer.setDealerId(1L);
        dealer.setAddress("12aas");
        dealer.setUserName("robot");
        Store store = new Store();
        store.setStoreName("robot/s");
        dealer.setStore(store);
        ArrayList<Dealer> dealers = new ArrayList<>();
        dealers.add(dealer);
        given(this.dealerDao.getAllDealers()).willReturn(dealers);
        Assert.assertNotNull(dealerService.getAllDealers());
        Assert.assertEquals(dealerService.getAllDealers().get(0).getUserName(), "robot");
        Assert.assertEquals(dealerService.getAllDealers().get(0).getStoreName(), "robot/s");
    }

    @Test
    public void testAddAndUpdate() throws Exception {
        DealerParameter dealerParameter = new DealerParameter();
        dealerParameter.setUserName("zhang qiang");
        dealerParameter.setAddress("addr.");
        dealerParameter.setContact("0371-7898888");
        dealerParameter.setRealName("zhang san");
        dealerParameter.setPassword("123456");

        dealerService.addADealer(dealerParameter);

        Dealer dealer = new Dealer();
        dealer.setDealerId(123L);

        given(this.dealerDao.getDealerById(123L)).willReturn(dealer);
        dealerParameter.setKey(123L);
        dealerParameter.setUserName("changed userName");

        dealerService.updateDealer(dealerParameter);
    }
}