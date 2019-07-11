package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Dealer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * DealerDao的测试类.
 *
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DealerDaoTest {

    @Autowired
    private DealerDao dealerDao;

    /*
     * assume we have these tuples in the database in the beginning,
     * in table:
     * `dealer` (`dealer_id`, `address`, `attached`, `avatar`, `contact`, `password`, `real_name`, `user_name`, `store_id`)
     *          (22, 'SJTU EAST#15', false, 'image/21f99283.jpg', '1238888', '123456', 'zhangsan', 'sjtu', null)
     *          (24, 'ECNU #5', false, 'image/320392039.jpg', '3456666', 'abc123', 'lisi', 'ecnu', null)
     *          (25, 'SJTU #37', true, 'image/defaultAvatar.jpg', '12345678', 'qwerasdf', 'zhangwuji', 'wuji', 24)
     * in table:
     * `store` (`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`)
     *         (24, 'JianChuan Road', true, '020-999888', 'image/idfosnfds.jpg', 123.4324, 40.131, '2019-07-10 09:00:21', '2019-07-10 17:00:35', 'JinGongMen', 25)
     *         (23, 'Dongchuan Road 800', false, '123456', 'image/sjtu.jpg', 12, 34.099, '2019-07-10 08:00:56', '2019-07-10 23:00:06', 'SJTU', null)
     *
     * */

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(dealerDao);
    }

    @Test
    public void testGetDealerById() throws Exception {
        Dealer dealer1 = dealerDao.getDealerById(10L);
        Assert.assertNull(dealer1);
        Dealer dealer2 = dealerDao.getDealerById(22L);
        Assert.assertEquals(dealer2.getDealerId().longValue(), 22L);
        Assert.assertEquals(dealer2.getUserName(), "sjtu");
        Assert.assertEquals(dealer2.getAddress(), "SJTU EAST#15");
        Assert.assertEquals(dealer2.getAvatar(), "image/21f99283.jpg");
        Assert.assertEquals(dealer2.getContact(), "1238888");
        Assert.assertEquals(dealer2.isAttached(), false);
        Assert.assertNull(dealer2.getStore());
    }

    @Test
    public void testUpdateDealer() throws Exception {
        Dealer dealer = dealerDao.getDealerById(22L);
        dealer.setContact("1234");
        dealerDao.updateDealer(dealer);
        Assert.assertEquals(dealer.getContact(), "1234");
    }

    @Test
    public void testGetAllDealers() throws Exception {
        List<Dealer> dealers = dealerDao.getAllDealers();
        Assert.assertNotNull(dealers);
    }

    @Test
    public void testAddAndDeleteDealer() throws Exception {
        Dealer dealer = new Dealer();
        dealer.setUserName("helloUser");
        dealer.setPassword("123");
        dealer.setAddress("XuJiaHui");
        dealer.setRealName("ha");
        dealer.setContact("45677777");
        dealer.setAvatar("image/1.jpg");
        dealer.setAttached(false);
        Long newId = dealerDao.addADealer(dealer);
        Assert.assertNotNull(newId);
        dealerDao.deleteDealer(newId);
        Dealer dealer1 = dealerDao.getDealerById(newId);
        Assert.assertNull(dealer1);
    }

    @Test
    public void testGetAllUnbindDealers() throws Exception {
        List<Dealer> unbindDealers = dealerDao.getAllUnbindDealers();
        Assert.assertNotNull(unbindDealers);
        Assert.assertEquals(unbindDealers.size() > 0, true);
        Assert.assertNotNull(unbindDealers.get(0));
        Assert.assertEquals(unbindDealers.get(0).getDealerId().longValue(), 22);
    }

    @Test
    public void testGetDealerByUserNameAndPassword() throws Exception {
        Dealer dealer1 = dealerDao.getDealerByUserNameAndPassword("sjtu", "123456");
        Assert.assertNotNull(dealer1);
        Dealer dealer2 = dealerDao.getDealerByUserNameAndPassword("sjtu", "123");
        Assert.assertNull(dealer2);
        Dealer dealer3 = dealerDao.getDealerByUserNameAndPassword("ecnu", "123456");
        Assert.assertNull(dealer3);
        Dealer dealer4 = dealerDao.getDealerByUserNameAndPassword("sjtuse", "123456");
        Assert.assertNull(dealer4);
    }

    @Test
    public void testUpdateDealerPassword() throws Exception {

    }

    @Test
    public void testUpdateDealerAvatar() throws Exception {
        dealerDao.updateDealerAvatar(22L, "image/1.jpg");
        Dealer dealer = dealerDao.getDealerById(22L);
        Assert.assertNotNull(dealer);
        Assert.assertEquals(dealer.getAvatar(), "image/1.jpg");
        dealerDao.updateDealerAvatar(22L, "image/21f99283.jpg");
    }

}