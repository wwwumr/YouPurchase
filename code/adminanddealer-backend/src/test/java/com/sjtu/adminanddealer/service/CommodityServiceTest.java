package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.dao.CommodityDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;

/**
 * CommodityService的测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
//@WebMvcTest(CommodityService.class)
//@AutoConfigureMockMvc
@SpringBootTest
public class CommodityServiceTest {

    @Autowired
    private CommodityService commodityService;

    @MockBean
    private CommodityDao commodityDao;

    @MockBean
    private StoreDao storeDao;

    @MockBean
    private FileUploadUtil fileUploadUtil;

    @MockBean
    private StringRedisTemplate redisTemplate;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(commodityService);
    }

    @Test
    public void testGetAllCommoditiesByStore() throws Exception {
        Commodity commodity1 = new Commodity(12.5, "耳机线", "image/isndsnd.jpg", true, 100, 80);
        Commodity commodity2 = new Commodity(35, "notebook", "image/dsdsa.gif", true, 100, 40);
        List<Commodity> commodityList = new ArrayList<>();
        commodityList.add(commodity1);
        commodityList.add(commodity2);

        given(this.commodityDao.getAllCommodityByStore(1L)).willReturn(commodityList);

        Assert.assertNotNull(commodityService.getAllCommoditiesByStore(1L));
        Assert.assertEquals(commodityService.getAllCommoditiesByStore(1L).get(0).getInventory().intValue(), 100);
        Assert.assertEquals(commodityService.getAllCommoditiesByStore(1L).get(1).getCommodityInfo(), "notebook");
    }

    @Test
    public void testGetCommodityById() throws Exception {
        Commodity commodity2 = new Commodity(35, "notebook", "image/dsdsa.gif",
                true, 100, 40);
        commodity2.setCommodityId(1L);
        given(this.commodityDao.getCommodityById(1L)).willReturn(commodity2);

        Assert.assertNotNull(commodityService.getCommodityById(1L));
        Assert.assertEquals(commodityService.getCommodityById(1L).getInventory().intValue(), 100);
        Assert.assertEquals(commodityService.getCommodityById(1L).getRemaining().intValue(), 40);
        Assert.assertEquals(commodityService.getCommodityById(1L).getCommodityInfo(), "notebook");

    }

}