package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

/**
 * DealerService的测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
//@WebMvcTest(DealerService.class)
//@AutoConfigureMockMvc
@SpringBootTest
public class DealerServiceTest {

    @MockBean
    private DealerDao dealerDao;

    @MockBean
    private StoreDao storeDao;

    @MockBean
    private FileUploadUtil fileUploadUtil;

    @MockBean
    private StringRedisTemplate redisTemplate;

    @Autowired
    private DealerService dealerService;

    @Value("${imageBaseDirectory}")
    private String imageBaseDirectory;

    @Value("${dealerDefaultAvatarUrl}")
    private String dealerDefaultAvatarUrl;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(dealerService);
    }

    @Test
    public void testGetAllDealers() throws Exception {
        Dealer dealer1 = new Dealer("dealerName", "1234", 1, new Date(), "zhangsan",
                "12348888", "image/232323.jpg", true, null);
        Dealer dealer2 = new Dealer("dealername2", "12345", 0, new Date(), "zhangsi",
                "12347777", "image/2ewe323.jpg", false, null);
        dealer1.setDealerId(1L);
        dealer2.setDealerId(2L);
        Store store = new Store();
        store.setStoreName("robot/s");
        dealer1.setStore(store);
        ArrayList<Dealer> dealers = new ArrayList<>();
        dealers.add(dealer1);
        dealers.add(dealer2);
        given(this.dealerDao.getAllDealers()).willReturn(dealers);
        Assert.assertNotNull(dealerService.getAllDealers());
        Assert.assertEquals(dealerService.getAllDealers().get(0).getUserName(), "dealerName");
        Assert.assertEquals(dealerService.getAllDealers().get(0).getStoreName(), "robot/s");
        Assert.assertEquals(dealerService.getAllDealers().get(1).getStoreName(), null);
    }

    @Test
    public void testGetDealerByDealerId() throws Exception {
        Dealer dealer1 = new Dealer("dealerName", "1234", 1, new Date(), "zhangsan",
                "12348888", "image/232323.jpg", true, null);
        dealer1.setDealerId(1L);
        Store store = new Store();
        store.setStoreName("robot/s");
        dealer1.setStore(store);

        Dealer dealer2 = new Dealer("dealername2", "12345", 0, new Date(), "zhangsi",
                "12347777", "image/2ewe323.jpg", false, null);
        dealer2.setDealerId(2L);

        given(this.dealerDao.getDealerById(1L)).willReturn(dealer1);
        given(this.dealerDao.getDealerById(2L)).willReturn(dealer2);

        Assert.assertNotNull(dealerService.getDealerByDealerId(1L));
        Assert.assertNotNull(dealerService.getDealerByDealerId(2L));
        Assert.assertEquals(dealerService.getDealerByDealerId(1L).getRealName(), "zhangsan");
        Assert.assertEquals(dealerService.getDealerByDealerId(2L).getStoreName(), null);
    }

    @Test
    public void testAddAndUpdateAndDelete() throws Exception {
        DealerParameter dealerParameter = new DealerParameter();
        dealerParameter.setUserName("zhang qiang");
        dealerParameter.setGender(1);
        dealerParameter.setBirthday(new Date());
        dealerParameter.setContact("0371-7898888");
        dealerParameter.setRealName("zhang san");

        given(this.dealerDao.addADealer(any())).willReturn(22L);
        JSONObject json = dealerService.addADealer(dealerParameter);
        Assert.assertEquals(json.getLongValue("key"), 22L);
        Assert.assertEquals(json.getString("avatar"), this.dealerDefaultAvatarUrl);

        Dealer dealer = new Dealer();
        dealer.setDealerId(22L);

        given(this.dealerDao.getDealerById(22L)).willReturn(dealer);
        dealerParameter.setKey(22L);
        dealerParameter.setUserName("changed userName");

        dealerService.updateDealer(dealerParameter);

        dealerService.deleteDealer(22L);
    }

    @Test
    public void testGetAllUnbindDealers() throws Exception {
        Dealer dealer = new Dealer("dealername2", "12345", 0, new Date(), "zhangsi",
                "12347777", "image/2ewe323.jpg", false, null);
        dealer.setDealerId(2L);
        ArrayList<Dealer> unbindDealers = new ArrayList<>();
        unbindDealers.add(dealer);
        given(this.dealerDao.getAllUnbindDealers()).willReturn(unbindDealers);

        List<DealerDTO> dealerDTOS = dealerService.getAllUnbindDealers();
        Assert.assertNotNull(dealerDTOS);
        Assert.assertEquals(dealerDTOS.get(0).getStoreName(), null);
        Assert.assertEquals(dealerDTOS.get(0).getUserName(), "dealername2");
    }

}