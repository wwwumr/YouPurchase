package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.service.CommodityService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * CommodityController的单元测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = {CommodityController.class})
@AutoConfigureMockMvc
public class CommodityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CommodityController commodityController;

    @MockBean
    private CommodityService commodityService;

    @MockBean
    private StringRedisTemplate redisTemplate;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(commodityController);
    }

    @Test
    public void testGetCommodityFromStore() throws Exception {
        this.mockMvc.perform(get("/stores/1/commodities")).andExpect(status().isOk());
    }

    @Test
    public void testGetCommodityById() throws Exception {
        this.mockMvc.perform(get("/commodities/1")).andExpect(status().isOk());
    }
}