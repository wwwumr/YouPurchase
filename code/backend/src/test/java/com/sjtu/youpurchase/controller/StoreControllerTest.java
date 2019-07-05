package com.sjtu.youpurchase.controller;

import com.alibaba.fastjson.JSON;
import com.sjtu.youpurchase.parameter.StoreParameter;
import com.sjtu.youpurchase.service.StoreService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {StoreController.class})
@AutoConfigureMockMvc
public class StoreControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private StoreService storeService;

    @Test
    public void testGetMethod() throws Exception {
        this.mvc.perform(get("/stores")).andExpect(status().isOk());
    }

    @Test
    public void testPostMethod() throws Exception {
        StoreParameter storeParameter = new StoreParameter();
        storeParameter.setStoreName("testStoreName");
        storeParameter.setAddress("ECNU");
        storeParameter.setContact("3458888");
        String[] hours = {"7:30", "18:00"};
        storeParameter.setHours(hours);

        this.mvc.perform(post("/stores").content(JSON.toJSONString(storeParameter)).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testBindDealerStore() throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("dealerId", "123");
        params.add("storeId", "233");
        this.mvc.perform(get("/stores/bind").params(params))
                .andExpect(status().isOk())
                .andExpect(content().string("bind"));
    }

    @Test
    public void testUnBindDealerAndStore() throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("dealerId", "123");
        params.add("storeId", "233");
        this.mvc.perform(get("/stores/unbind").params(params))
                .andExpect(status().isOk())
                .andExpect(content().string("unbind"));
    }
}