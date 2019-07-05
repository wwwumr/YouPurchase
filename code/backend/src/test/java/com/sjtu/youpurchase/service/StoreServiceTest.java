package com.sjtu.youpurchase.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.youpurchase.dao.StoreDao;
import com.sjtu.youpurchase.entity.Commodity;
import com.sjtu.youpurchase.entity.Dealer;
import com.sjtu.youpurchase.entity.Store;
import com.sjtu.youpurchase.parameter.StoreParameter;
import com.sun.scenario.effect.impl.sw.java.JSWBlend_EXCLUSIONPeer;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

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
    public void testDI() throws Exception{
        Assert.assertNotNull(storeService);
    }

    @Test
    public void testGetAllStores() throws Exception {
        Store store = new Store();
        store.setAddress("tAddress");
        store.setCommodityList(new ArrayList<Commodity>());
        store.setContact("123456");
        Dealer dealer = new Dealer();
        dealer.setDealerId(1L);
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

    // TODO: test update
    @Test
    public void testAddStore() throws Exception{
        StoreParameter storeParameter = new StoreParameter();
        storeParameter.setStoreName("postname");
        storeParameter.setAddress("postaddr");
        storeParameter.setContact("1234");
        String[] hours = {"7:00", "21:00"};
        storeParameter.setHours(hours);

        JSONObject json = storeService.addAStore(storeParameter);
        System.out.println(json);

        /* 由于mock不能模拟storeDao的方法，实际并没有持久化这个数据，所以
        * json中的key依然是null，没有值，如果想利于测试，可以把storeDao的方法返回值不设置成void，
        * 比如返回生成的key*/
        Assert.assertEquals(json.getString("coverUrl"),"/defaultStoreCover");
    }

    @Test
    public void testUpdateStore() throws Exception{
        StoreParameter storeParameter = new StoreParameter();
        storeParameter.setStoreName("postname");
        storeParameter.setAddress("postaddr");
        storeParameter.setContact("1234");
        String[] hours = {"7:00", "21:00"};
        storeParameter.setHours(hours);
    }

}