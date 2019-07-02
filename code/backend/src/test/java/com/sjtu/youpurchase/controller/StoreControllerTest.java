package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.service.StoreService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
}