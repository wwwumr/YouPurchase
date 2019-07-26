package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Store;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * StoreDao的测试类.
 *
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class StoreDaoTest {

    @Autowired
    private StoreDao storeDao;

    /*
     * assume we have these tuples in the database in the beginning,
     * in table:
     * `dealer` (`dealer_id`, `address`, `attached`, `avatar`, `contact`, `password`, `real_name`, `user_name`, `store_id`)
     *          (22, 'SJTU EAST#15', false, 'image/21f99283.jpg', '1238888', '123456', 'zhangsan', 'sjtu', null)
     *          (24, 'ECNU #5', false, 'image/320392039.jpg', '3456666', 'abc123', 'lisi', 'ecnu', null)
     *          (250, 'SJTU #37', true, 'image/defaultAvatar.jpg', '12345678', 'qwerasdf', 'zhangwuji', 'wuji', 24)
     * in table:
     * `store` (`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`)
     *         (231, 'JianChuan Road', true, '020-999888', 'image/idfosnfds.jpg', 123.4324, 40.131, '2019-07-10 09:00:21', '2019-07-10 17:00:35', 'JinGongMen', 25)
     *         (204, 'Dongchuan Road 800', false, '123456', 'image/sjtu.jpg', 12, 34.099, '2019-07-10 08:00:56', '2019-07-10 23:00:06', 'SJTU', null)
     *
     * */

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(storeDao);
    }

    @Test
    public void testGetAllStores() throws Exception {
        List<Store> stores = storeDao.getAllStores();
        Assert.assertNotNull(stores);
        Assert.assertEquals(stores.get(0).getStoreId().longValue(), 204L);
        Assert.assertEquals(stores.get(1).getStoreId().longValue(), 231L);

    }

    @Test
    public void testGetStoreByStoreId() throws Exception {
        Store store1 = storeDao.getStoreByStoreId(1L);
        Assert.assertNull(store1);
        Store store2 = storeDao.getStoreByStoreId(231L);
        Assert.assertEquals(store2.getAddress(), "JianChuan Road");
        Assert.assertEquals(store2.getContact(), "020-999888");
        Assert.assertEquals(store2.getCoverPicUrl(), "image/idfosnfds.jpg");
        Assert.assertEquals(store2.getStoreName(), "JinGongMen");
        Assert.assertEquals(store2.getLatitude(), 123.4324, 0.01);
        Assert.assertEquals(store2.getLongitude(), 40.131, 0.01);

    }

    @Test
    public void testAddAndDeleteStore() throws Exception {
        Store store = new Store();
        store.setStoreName("helloname");
        store.setCoverPicUrl("image/2323.gif");
        store.setAddress("HuaPing Road");
        store.setLatitude(123.4342);
        store.setLongitude(34.3232);
        store.setContact("12342222");
        store.setAttached(false);
        store.setOpenHourStart(new Date());
        store.setOpenHourEnd(new Date());
        store.setDeliveryType(0);
        Long newId = storeDao.addAStore(store);
        Assert.assertNotNull(newId);
        storeDao.deleteStore(newId);
        Store store1 = storeDao.getStoreByStoreId(newId);
        Assert.assertNull(store1);
    }

    @Test
    public void testUpdateStore() throws Exception {
        Store store = storeDao.getStoreByStoreId(204L);
        // origin Dongchuan Road 800 set to Shanghai Station
        store.setAddress("Shanghai Station");
        storeDao.updateStore(store);
        Assert.assertEquals(store.getAddress(), "Shanghai Station");
    }


    @Test
    public void testGetAllUnbindStore() throws Exception {
        // 由于加上了transactional的原因，导致这次的获取在运行时有读取的冲突，导致测试结果错误
        // 单独执行这段代码时测试可以通过（正常情况），所以把这个测试用例跳过
        List<Store> unbindStores = storeDao.getAllUnbindStore();
        Assert.assertNotNull(unbindStores);
        System.out.println(unbindStores);
        Assert.assertTrue(unbindStores.size() != 0);
    }

    // 这个测试需要和下面一个测试testUnbind一起进行
    @Test
    public void testBind() throws Exception {
        storeDao.bindDealerStore(22L, 204L);
        Store store = storeDao.getStoreByStoreId(204L);
        Assert.assertTrue(store.isAttached());

    }

    // 这个测试需要和上面一个测试testBind一起进行
    @Test
    public void testUnbind() throws Exception {
        storeDao.unbindDealerStore(22L, 204L);
        Store store1 = storeDao.getStoreByStoreId(204L);
        Assert.assertFalse(store1.isAttached());
    }

    @Test
    public void testUploadCoverAndDeliveryType() throws Exception {
        Store store = new Store();
        store.setStoreName("Sname");
        store.setCoverPicUrl("image/2323.gif");
        store.setAddress("HuaPing Road");
        store.setLatitude(123.4342);
        store.setLongitude(34.3232);
        store.setContact("020-11113333");
        store.setAttached(false);
        store.setOpenHourStart(new Date());
        store.setOpenHourEnd(new Date());
        store.setDeliveryType(0);
        store.setDeliveryRange(5);
        Long newId = storeDao.addAStore(store);
        storeDao.updateStoreCoverPic(newId, "newPicUrl");
        storeDao.updateStoreDeliveryType(1, newId);

        storeDao.deleteStore(newId);
    }
}