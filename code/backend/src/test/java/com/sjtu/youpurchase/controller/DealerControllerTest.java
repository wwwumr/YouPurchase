package com.sjtu.youpurchase.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sjtu.youpurchase.service.DealerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {DealerController.class})
@AutoConfigureMockMvc
public class DealerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DealerService service;

    @Test
    public void testGetMethod() throws Exception {
        this.mockMvc.perform(get("/dealers")).andExpect(status().isOk());
    }

    @Test
    public void testPostMethod() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userName", "testUsername");
        jsonObject.put("address", "Beck street");
        jsonObject.put("realName", "sherlock");
        jsonObject.put("contact", "123456000");
        jsonObject.put("password", "abcde");
        this.mockMvc.perform(post("/dealers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JSON.toJSONString(jsonObject)))
                .andExpect(status().isOk())
                .andExpect(content().string("saved"));
    }

    @Test
    public void testPutMethod() throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", "1");
        jsonObject.put("userName", "testUsername");
        jsonObject.put("address", "Beck street");
        jsonObject.put("realName", "sherlock");
        jsonObject.put("contact", "123456000");
        jsonObject.put("password", "abcdef");
        this.mockMvc.perform(put("/dealers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JSON.toJSONString(jsonObject)))
                .andExpect(status().isOk())
                .andExpect(content().string("saved"));
    }
}