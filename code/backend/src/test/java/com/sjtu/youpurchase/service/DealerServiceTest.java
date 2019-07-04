package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.DealerRequestDTO;
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

import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

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
        DealerRequestDTO dealerRequestDTO = new DealerRequestDTO();
        dealerRequestDTO.setUserName("zhang qiang");
        dealerRequestDTO.setAddress("addr.");
        dealerRequestDTO.setContact("0371-7898888");
        dealerRequestDTO.setRealName("zhang san");
        dealerRequestDTO.setPassword("123456");

        dealerService.addADealer(dealerRequestDTO);

        Dealer dealer = new Dealer();
        dealer.setDealerId(123L);

        given(this.dealerDao.getDealerById(123L)).willReturn(dealer);
        dealerRequestDTO.setKey(123L);
        dealerRequestDTO.setUserName("changed userName");

        dealerService.updateDealer(dealerRequestDTO);
    }
}