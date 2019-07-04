package com.sjtu.youpurchase.dao;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.sjtu.youpurchase.entity.Store;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
//@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@Import({StoreDaoImpl.class, StoreRepository.class})
public class StoreDaoTest {
    /// 下面的TestEntityManager是在加上@DataJpaTest才能使用的类，但是由于这个项目不是简单的一个Repository
    /// 只用@DataJpaTest测试无法注入Dao类
//    @Autowired
//    private TestEntityManager entityManager;

    @Autowired
    private StoreDao storeDao;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(storeDao);
    }

    @Ignore
    @Test
    public void testFindAllStores() throws Exception {
        List<Store> storeList = this.storeDao.getAllStores();
        Assert.assertEquals(storeList.size(), 0);
    }

    @Test
    public void testGetStoreById() throws Exception{
        // assume we have a tuple in the database which value is
        // (`store_id`, `address`, `contact`, `cover_pic_url`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`, `attached`)
        // (233, 'testaddress', '123456000', '/testimg.jpg', 123.3024, 49.2313, '2019-07-04 19:30:13', '2019-07-04 08:00:36', 'laowang''s', null, false)
        Store store = storeDao.getStoreByStoreId(233L);
        Assert.assertEquals(store.getStoreName(),"laowang's");
        Assert.assertEquals(store.getAddress(),"testaddress");
        Assert.assertEquals(store.getCoverPicUrl(),"/testimg.jpg");
    }

    @Test
    public void testAddAStore() throws Exception{
        Store store = new Store();
        store.setStoreName("KFC");
        store.setAddress("Dongchuan Road 800");
        store.setContact("3458888");
        store.setAttached(false);
        store.setLatitude(132.323);
        store.setLongitude(34.3121);
        Assert.assertNull(store.getStoreId());
        storeDao.addAStore(store);
        Assert.assertNotNull(store.getStoreId());
    }

    @Test
    public void testUpdateStore() throws Exception{
        // assume we have a tuple in the database which value is
        // (`store_id`, `address`, `contact`, `cover_pic_url`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`, `attached`)
        // (233, 'testaddress', '123456000', '/testimg.jpg', 123.3024, 49.2313, '2019-07-04 19:30:13', '2019-07-04 08:00:36', 'laowang''s', null, false)
        Store store = storeDao.getStoreByStoreId(233L);
        Assert.assertEquals(store.getStoreName(),"laowang's");
        store.setStoreName("five cafe");
        storeDao.updateStore(store);
        Store store1 = storeDao.getStoreByStoreId(233L);
        Assert.assertEquals(store1.getStoreName(),"five cafe");
    }
}