package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.service.DealerService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * DealerController的单元测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = {DealerController.class})
@AutoConfigureMockMvc
public class DealerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DealerController dealerController;

    @MockBean
    private DealerService dealerService;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(dealerController);
    }

    @Test
    public void testGetAllDealers() throws Exception {
        this.mockMvc.perform(get("/dealers")).andExpect(status().isOk());
    }

    @Test
    public void testGetDealerByDealerId() throws Exception {
        DealerDTO dto = new DealerDTO(1L, "user", "image/f3920f.jpg", "England",
                "Ed", "12345555", null, null, "123pass");
        given(this.dealerService.getDealerByDealerId(1L)).willReturn(dto);

        this.mockMvc.perform(get("/dealers/1")).andExpect(status().isOk())
                .andExpect(content().json("{\"key\":1,\"userName\":\"user\"," +
                        "\"avatar\":\"image/f3920f.jpg\",\"address\":\"England\",\"realName\":\"Ed\"," +
                        "\"contact\":\"12345555\",\"storeId\":null,\"storeName\":null,\"password\":\"123pass\"}"));
    }

    @Test
    public void testAddNewDealer() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", 1L);
        jsonObject.put("avatar", "image/avatar");

        DealerParameter dealerParameter = new DealerParameter(null, "user", "Shanghai", "jiang",
                "123456", "password", null);
        given(this.dealerService.addADealer(dealerParameter)).willReturn(jsonObject);
        this.mockMvc.perform(post("/dealers").contentType(MediaType.APPLICATION_JSON).content(JSON.toJSONString(dealerParameter)))
                .andExpect(status().isOk()).andExpect(content().json(jsonObject.toJSONString()));
    }

    @Test
    public void testUpdateDealer() throws Exception {
        DealerParameter dealerParameter = new DealerParameter();
        this.mockMvc.perform(put("/dealers").contentType(MediaType.APPLICATION_JSON).content(JSON.toJSONString(dealerParameter)))
                .andExpect(status().isOk()).andExpect(content().string("saved"));
    }

    @Test
    public void testDeleteDealers() throws Exception {
        this.mockMvc.perform(delete("/dealers").contentType(MediaType.APPLICATION_JSON).content("[1,2,3,4]"))
                .andExpect(status().isOk()).andExpect(content().string("DELETE"));
    }

    @Test
    public void testGetAllUnbindDealer() throws Exception {
        this.mockMvc.perform(get("/dealers/unbindDealers")).andExpect(status().isOk());
    }

    @Test
    public void testUpdateDealerAvatar() throws Exception {
        given(this.dealerService.updateDealerAvatar(any(), any(), any())).willReturn("image/new.jpg");
        byte[] bytes = null;
        MockMultipartFile file = new MockMultipartFile("file", "a.jpg", MediaType.TEXT_PLAIN_VALUE, bytes);
        this.mockMvc.perform(MockMvcRequestBuilders.fileUpload("/dealers/avatar").file(file)
                .param("key", "1").param("avatar", "origin")).andExpect(status().isOk());
    }

}