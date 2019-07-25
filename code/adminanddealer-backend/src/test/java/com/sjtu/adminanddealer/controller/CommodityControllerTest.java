package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.service.CommodityService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * CommodityController的单元测试类.
 *
 * @author Chuyuxuan
 */
@Ignore
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = {CommodityController.class})
//@AutoConfigureMockMvc
public class CommodityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CommodityController commodityController;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private CommodityService commodityService;

    @MockBean
    private StringRedisTemplate redisTemplate;


    @Before
    public void setUp() {
        // 单个类,项目拦截器无效
        mockMvc = MockMvcBuilders.standaloneSetup(new CommodityController()).build();
//        //项目拦截器有效
//        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(commodityController);
    }

    @Test
    public void testGetCommodityFromStore() throws Exception {
        MockHttpSession session = new MockHttpSession();
        session.setAttribute("loginUserType", "DEALER");
        session.setAttribute("loginUserId", 12L);
        given(this.redisTemplate.opsForValue().get("loginUser:12")).willReturn(session.getId());
        this.mockMvc.perform(get("/api/du/stores/1/commodities").headers(new HttpHeaders()).session(session)).andExpect(status().isOk());
    }

    @Test
    public void testGetCommodityById() throws Exception {
        this.mockMvc.perform(get("/api/du/commodities/1")).andExpect(status().isOk());
    }
}