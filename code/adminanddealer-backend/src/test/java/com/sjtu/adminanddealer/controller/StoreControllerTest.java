package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import com.sjtu.adminanddealer.service.StoreService;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * StoreController的单元测试类.
 *
 * @author Chuyuxuan
 */
@Ignore
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = {StoreController.class})
@AutoConfigureMockMvc
public class StoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StoreController storeController;

    @MockBean
    private StoreService storeService;

    @MockBean
    private StringRedisTemplate redisTemplate;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(storeController);
    }

    @Test
    public void testGetAllStores() throws Exception {
        this.mockMvc.perform(get("/api/a/stores")).andExpect(status().isOk());
    }

    @Test
    public void testGetStoreByStoreId() throws Exception {
        this.mockMvc.perform(get("/api/ad/stores/1")).andExpect(status().isOk());
    }

    @Test
    public void testAddStore() throws Exception {
        JSONObject json = new JSONObject();
        json.put("key", 1L);
        json.put("coverPicUrl", "image/default");

        StoreParameter storeParameter = new StoreParameter(null, "testStoreName", "7777777",
                "8:00", "19:00", 1, 8.0, null);
        given(this.storeService.addAStore(storeParameter)).willReturn(json);

        this.mockMvc.perform(post("/stores").contentType(MediaType.APPLICATION_JSON).content(JSON.toJSONString(storeParameter)))
                .andExpect(status().isOk()).andExpect(content().json(json.toJSONString()));
    }

    @Test
    public void testUpdateStore() throws Exception {
        StoreParameter storeParameter = new StoreParameter(null, "testStoreName", "7777777",
                "8:00", "19:00", 0, 5.0, null);
        storeParameter.setKey(1L);
        this.mockMvc.perform(put("/stores").contentType(MediaType.APPLICATION_JSON).content(JSON.toJSONString(storeParameter)))
                .andExpect(status().isOk()).andExpect(content().json("{\"key\":1}"));
    }

    @Test
    public void testDeleteStore() throws Exception {
        this.mockMvc.perform(delete("/stores").contentType(MediaType.APPLICATION_JSON).content("[1,2,3,4]"))
                .andExpect(status().isOk()).andExpect(content().string("DELETE"));
    }

    @Test
    public void testBindDealerAndStore() throws Exception {
        this.mockMvc.perform(get("/stores/bind").param("dealerId", "1").param("storeId", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("bind"));
    }

    @Test
    public void testUnbindDealerAndStore() throws Exception {
        this.mockMvc.perform(get("/stores/unbind").param("dealerId", "1").param("storeId", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("unbind"));
    }

    @Test
    public void testGetAllUnbindStore() throws Exception {
        this.mockMvc.perform(get("/stores/unbindStores")).andExpect(status().isOk());
    }

    @Test
    public void testUpdateStoreCover() throws Exception {
        given(this.storeService.updateStoreCoverPic(any(), anyLong(), anyString())).willReturn("image/newCover");
        byte[] bytes = null;
        MockMultipartFile file = new MockMultipartFile("file", "old.jpg", MediaType.TEXT_PLAIN_VALUE, bytes);
        this.mockMvc.perform(MockMvcRequestBuilders.fileUpload("/stores/cover").file(file)
                .param("key", "1").param("coverPicUrl", "old.jpg"))
                .andExpect(status().isOk())
                .andExpect(content().string("image/newCover"));
    }
}