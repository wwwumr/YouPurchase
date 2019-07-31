package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.dao.CommodityDao;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

/**
 * StoreService的测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
//@WebMvcTest(StoreService.class)
//@AutoConfigureMockMvc
@SpringBootTest
public class StoreServiceTest {

    @MockBean
    private StoreDao storeDao;

    @MockBean
    private DealerDao dealerDao;

    @MockBean
    private CommodityDao commodityDao;

    @MockBean
    private FileUploadUtil fileUploadUtil;

    @Autowired
    private StoreService storeService;

    @MockBean
    private StringRedisTemplate redisTemplate;

    @Test
    public void testDI() throws Exception {
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
        store.setDeliveryType(0);

        Store store1 = new Store();
        store1.setAddress("taddr1");
        store1.setContact("666888");
        store1.setStoreName("storsnnnn");
        store1.setAttached(false);
        store1.setCoverPicUrl("image/fsafsfe.jpg");
        store1.setStoreId(2L);
        store1.setLongitude(123.423);
        store1.setLatitude(56.232);
        store1.setOpenHourStart(new Date());
        store1.setOpenHourEnd(new Date());
        store1.setDeliveryType(0);

        ArrayList<Store> stores = new ArrayList<>();
        stores.add(store);
        stores.add(store1);
        given(this.storeDao.getAllStores()).willReturn(stores);
        Assert.assertNotNull(storeService.getAllStores());
        Assert.assertEquals(storeService.getAllStores().get(0).getStoreName(), "testStoreName");

    }

    @Test
    public void testGetStoreByStoreId() throws Exception {
        Store store = new Store();
        store.setStoreId(1L);
        store.setAddress("tAddress");
        store.setCommodityList(new ArrayList<Commodity>());
        store.setContact("123456");
        Dealer dealer = new Dealer();
        dealer.setDealerId(1L);
        store.setDealer(dealer);
        store.setStoreName("testStoreName");
        store.setOpenHourStart(new Date());
        store.setOpenHourEnd(new Date());
        store.setDeliveryType(0);

        given(this.storeDao.getStoreByStoreId(1L)).willReturn(store);

        Assert.assertNotNull(storeService.getStoreByStoreId(1L));
        Assert.assertEquals(storeService.getStoreByStoreId(1L).getKey().longValue(), 1L);
        Assert.assertEquals(storeService.getStoreByStoreId(1L).getAddress(), "tAddress");
        Assert.assertEquals(storeService.getStoreByStoreId(1L).getContact(), "123456");
        Assert.assertEquals(storeService.getStoreByStoreId(1L).getDealerId().intValue(), 1);

    }

    @Test
    public void testAddStore() throws Exception {
        StoreParameter storeParameter = new StoreParameter();
        storeParameter.setStoreName("postname");
        storeParameter.setAddress("postaddr");
        storeParameter.setContact("1234");
        storeParameter.setStartHour("7:00");
        storeParameter.setEndHour("21:00");
        given(this.storeDao.addAStore(any())).willReturn(1L);

        JSONObject json = storeService.addAStore(storeParameter);
        Assert.assertEquals(json.getLongValue("key"), 1L);
        Assert.assertEquals(json.getString("coverUrl"), "image/defaultStoreCover.png");
    }

    @Test
    public void testUpdateStore() throws Exception {
        StoreParameter storeParameter = new StoreParameter();
        storeParameter.setKey(1L);
        storeParameter.setStoreName("postname");
        storeParameter.setAddress("postaddr");
        storeParameter.setContact("1234");
        storeParameter.setStartHour("7:00");
        storeParameter.setEndHour("21:00");

        given(this.storeDao.getStoreByStoreId(1L)).willReturn(new Store());
        // 由于update的函数返回类型是void所以无法mock，这里就是测试调用传值是否有问题
        storeService.updateStore(storeParameter);
    }

    // deleteStore由于方法只有调用只有简单测试
    @Test
    public void testDeleteStore() throws Exception {
        storeService.deleteStore(1L);
    }

    @Test
    public void testGetAllUnbindStore() throws Exception {
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

        Store store1 = new Store();
        store1.setAddress("taddr1");
        store1.setContact("666888");
        store1.setStoreName("storsnnnn");
        store1.setAttached(false);
        store1.setCoverPicUrl("image/fsafsfe.jpg");
        store1.setStoreId(2L);
        store1.setLongitude(123.423);
        store1.setLatitude(56.232);
        store1.setOpenHourStart(new Date());
        store1.setOpenHourEnd(new Date());

        ArrayList<Store> stores = new ArrayList<>();
        stores.add(store);
        stores.add(store1);
        ArrayList<Store> unbindStores = new ArrayList<>();
        unbindStores.add(store1);
        given(this.storeDao.getAllUnbindStore()).willReturn(unbindStores);

        Assert.assertNotNull(storeService.getAllUnbindStore());
        Assert.assertEquals(storeService.getAllUnbindStore().get(0).getKey().longValue(), 2L);
        Assert.assertEquals(storeService.getAllUnbindStore().get(0).getContact(), "666888");
        Assert.assertEquals(storeService.getAllUnbindStore().get(0).getAddress(), "taddr1");
        Assert.assertNull(storeService.getAllUnbindStore().get(0).getDealerId());
    }

    // 只是传递参数
    @Test
    public void testUnbindStoreDealer() throws Exception {
        storeService.unbindDealerAndStore(1L, 2L);
    }

    @Test
    public void testBindStoreDealer() throws Exception {
        /* mock */
        Dealer dealer2 = new Dealer("dealername2", "12345", 0, new Date(), "zhangsi",
                "12347777", "image/2ewe323.jpg", false, null);
        dealer2.setDealerId(2L);
        given(this.dealerDao.getDealerById(2L)).willReturn(dealer2);
        given(this.dealerDao.getDealerById(1L)).willReturn(null);

        Store store1 = new Store();
        store1.setAddress("taddr1");
        store1.setContact("666888");
        store1.setStoreName("storsnnnn");
        store1.setAttached(false);
        store1.setCoverPicUrl("image/fsafsfe.jpg");
        store1.setStoreId(2L);
        store1.setLongitude(123.423);
        store1.setLatitude(56.232);
        store1.setOpenHourStart(new Date());
        store1.setOpenHourEnd(new Date());
        given(this.storeDao.getStoreByStoreId(2L)).willReturn(store1);

        storeService.bindDealerAndStore(2L, 2L);
        storeService.bindDealerAndStore(1L, 2L);
    }

    @Test
    public void testUpdateStoreCoverPic() throws Exception {
        given(this.fileUploadUtil.saveFile(any())).willReturn("image/1234.jpg");
        byte[] bytes = null;
        MultipartFile file = new MockMultipartFile("1.jpg", bytes);
        Assert.assertEquals(storeService.updateStoreCoverPic(file, 1L, "image/origin.jpg"), "image/1234.jpg");
        Assert.assertEquals(storeService.updateStoreCoverPic(file, 1L, "image/defaultStoreCover.png"), "image/1234.jpg");

    }

}