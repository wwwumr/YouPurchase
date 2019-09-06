package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.entity.CommodityClass;
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
 * CommodityDao的测试类
 *
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CommodityDaoTest {

    @Autowired
    private CommodityDao commodityDao;

    /* assume we have tuples in the database as follows:
     * in table:
     *  `commodity`(`commodity_id`, `commodity_cover_pic_url`, `commodity_info`, `inventory`, `on_shelves`, `price`, `remaining`)
     *             (200, 'image/commodityDefaultPic.jpg', 'commodity information 111', 100, true, 12, 50)
     *             (201, 'image/commodityDefaultPic.jpg', 'commodity_info_2', 300, true, 30, 300)
     *             (203, 'image/commodity1.jpg', 'information3', 200, false, 234, 0)
     * in table:
     * `store`(`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`)
     *        (204, 'Dongchuan Road 800', false, '123456', 'image/sjtu.jpg', 12, 34.099, '2019-07-10 08:00:56', '2019-07-10 23:00:06', 'SJTU', null)
     * in table:
     * `store_commodity` (`store_id`, `commodity_id`)
     *                   (204, 200)
     *                   (204, 201)
     * */

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(commodityDao);
    }

    @Test
    public void testGetAllCommodityByStore() throws Exception {
        List<Commodity> commodityList = commodityDao.getAllCommodityByStore(204L);
        Assert.assertNotNull(commodityList);
        Assert.assertEquals(commodityList.size(), 4);
        Assert.assertNotNull(commodityList.get(0));
        Assert.assertNotNull(commodityList.get(1));

    }

    @Test
    public void testGetCommodityById() throws Exception {
        Commodity commodity = commodityDao.getCommodityById(203L);
        Assert.assertNotNull(commodity);
        Assert.assertEquals(commodity.getCommodityId().longValue(), 203);
        Assert.assertEquals(commodity.getCommodityCoverPicUrl(), "image/commodity1.jpg");
        Assert.assertEquals(commodity.getCommodityInfo(), "information3");
        Assert.assertEquals(commodity.getOnShelves(), false);
        Assert.assertEquals(commodity.getInventory().intValue(), 200);
        Assert.assertEquals(commodity.getPrice(), 234, 0.01);

        Commodity commodity1 = commodityDao.getCommodityById(1000L);
        Assert.assertNull(commodity1);

    }

    @Test
    public void testAddUpdateDeleteCommodity() throws Exception {
        Commodity commodity = new Commodity();
        commodity.setPrice(12.5);
        commodity.setInventory(100);
        commodity.setRemaining(40);
        commodity.setOnShelves(true);
        commodity.setCommodityCoverPicUrl("image/hello");
        commodity.setCommodityInfo("shangpininxi");
        commodityDao.addCommodity(commodity, 204L);

        Assert.assertNotNull(commodity.getCommodityId());
        commodity.setCommodityInfo("changed");
        commodityDao.updateCommodity(commodity);

        commodityDao.deleteCommodity(commodity.getCommodityId());

    }

    @Test
    public void testCommodityClass() throws Exception {
        CommodityClass commodityClass1 = new CommodityClass();
        commodityClass1.setClassInfo("水果");
        CommodityClass commodityClass2 = new CommodityClass();
        commodityClass2.setClassInfo("酒水");
        CommodityClass commodityClass3 = new CommodityClass();
        commodityClass3.setClassInfo("零食");

        commodityDao.addNewCommodityClass(commodityClass1);
        commodityDao.addNewCommodityClass(commodityClass2);
        commodityDao.addNewCommodityClass(commodityClass3);


        commodityClass1.setClassInfo("蔬菜");
        commodityDao.updateCommodityClass(commodityClass1);

        commodityDao.deleteCommodityClass(commodityClass2.getCommodityClassId());

    }
}