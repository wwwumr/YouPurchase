package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import com.sjtu.adminanddealer.service.StoreService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.awt.*;

import static org.junit.Assert.*;
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
@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {StoreController.class})
@AutoConfigureMockMvc
public class StoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StoreController storeController;

    @MockBean
    private StoreService storeService;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(storeController);
    }

    @Test
    public void testGetAllStores() throws Exception{
        this.mockMvc.perform(get("/stores")).andExpect(status().isOk());
    }

    @Test
    public void testGetStoreByStoreId() throws Exception{
        this.mockMvc.perform(get("/stores/1")).andExpect(status().isOk());
    }

    @Test
    public void testAddStore() throws Exception {
        JSONObject json = new JSONObject();
        json.put("key", 1L);
        json.put("coverPicUrl","image/default");

        String[] hours = {"8:00","19:00"};
        StoreParameter storeParameter = new StoreParameter(null, "testStoreName","JiangChuan Road","7777777",
                hours, null);
        given(this.storeService.addAStore(storeParameter)).willReturn(json);

        this.mockMvc.perform(post("/stores").contentType(MediaType.APPLICATION_JSON).content(JSON.toJSONString(storeParameter)))
                .andExpect(status().isOk()).andExpect(content().json(json.toJSONString()));
    }

    @Test
    public void testUpdateStore() throws Exception {
        String[] hours = {"8:00","19:00"};
        StoreParameter storeParameter = new StoreParameter(null, "testStoreName","JiangChuan Road","7777777",
                hours, null);
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
    public void testBindDealerAndStore() throws Exception{
        this.mockMvc.perform(get("/stores/bind").param("dealerId","1").param("storeId","1"))
                .andExpect(status().isOk())
                .andExpect(content().string("bind"));
    }

    @Test
    public void testUnbindDealerAndStore() throws Exception{
        this.mockMvc.perform(get("/stores/unbind").param("dealerId","1").param("storeId","1"))
                .andExpect(status().isOk())
                .andExpect(content().string("unbind"));
    }

    @Test
    public void testGetAllUnbindStore() throws Exception{
        this.mockMvc.perform(get("/stores/unbindStores")).andExpect(status().isOk());
    }

    @Test
    public void testUpdateStoreCover() throws Exception{
        given(this.storeService.updateStoreCoverPic(any(),anyLong(),anyString())).willReturn("image/newCover");
        byte[] bytes = null;
        MockMultipartFile file = new MockMultipartFile("file", "old.jpg", MediaType.TEXT_PLAIN_VALUE, bytes);
        this.mockMvc.perform(MockMvcRequestBuilders.fileUpload("/stores/cover").file(file)
                .param("key","1").param("coverPicUrl","old.jpg"))
                .andExpect(status().isOk())
                .andExpect(content().string("image/newCover"));
    }
}