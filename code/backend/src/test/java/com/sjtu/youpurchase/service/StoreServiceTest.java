package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.dao.StoreDao;
import com.sjtu.youpurchase.entity.Commodity;
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
import java.util.Date;

import static org.mockito.BDDMockito.given;

/**
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@WebMvcTest(StoreService.class)
@AutoConfigureMockMvc
public class StoreServiceTest {

    @MockBean
    private StoreDao storeDao;

    @Autowired
    private StoreService storeService;

    @Test
    public void testGetAllStores() throws Exception {
        Store store = new Store();
        store.setAddress("tAddress");
        store.setCommodityList(new ArrayList<Commodity>());
        store.setContact("123456");
        Dealer dealer = new Dealer();
        dealer.setId(1L);
        store.setDealer(dealer);
        store.setStoreName("testStoreName");
        store.setOpenHourStart(new Date());
        store.setOpenHourEnd(new Date());
        ArrayList<Store> stores = new ArrayList<>();
        stores.add(store);
        given(this.storeDao.getAllStores()).willReturn(stores);
        Assert.assertNotNull(storeService.getAllStores());
        Assert.assertEquals(storeService.getAllStores().get(0).getStoreName(), "testStoreName");
        System.out.println(storeService.getAllStores().get(0).getHours()[0]);
        System.out.println(storeService.getAllStores().get(0).getHours()[1]);
    }

}