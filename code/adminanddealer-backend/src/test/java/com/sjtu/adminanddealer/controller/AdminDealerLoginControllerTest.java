package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * AdminDealerLoginController的单元测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {AdminDealerLoginController.class})
@AutoConfigureMockMvc
public class AdminDealerLoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminDealerLoginController adminDealerLoginController;

    @MockBean
    private AdminDealerLoginService adminDealerLoginService;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(adminDealerLoginController);
    }

    @Test
    public void testAdminLogin() throws Exception {
        given(this.adminDealerLoginService.getAdminByUserNameAndPassword("admin","password"))
                .willReturn(new Admin());
        given(this.adminDealerLoginService.getAdminByUserNameAndPassword("user","1234"))
                .willReturn(null);
        this.mockMvc.perform(get("/login/admin").param("userName","admin").param("password","password"))
                .andExpect(content().string("ADMIN"));
        this.mockMvc.perform(get("/login/admin").param("userName", "user").param("password", "1234"))
                .andExpect(content().string("ERROR"));

    }

    @Test
    public void testDealerLogin() throws Exception {
        given(this.adminDealerLoginService.getDealerByUserNameAndPassword("user","password"))
                .willReturn(new Dealer());
        given(this.adminDealerLoginService.getDealerByUserNameAndPassword("wrong","wrong"))
                .willReturn(null);
        this.mockMvc.perform(get("/login/dealer").param("userName","user").param("password","password"))
                .andExpect(content().string("DEALER"));
        this.mockMvc.perform(get("/login/dealer").param("userName", "wrong").param("password", "WRONG"))
                .andExpect(content().string("ERROR"));
    }

    @Test
    public void testLogOut() throws Exception {
        this.mockMvc.perform(get("/logout")).andExpect(status().isOk()).andExpect(content().string("LOGOUT"));
    }

    @Test
    public void testGetUserNameFromSession() throws Exception {
        MockHttpSession session = new MockHttpSession();
        Admin admin = new Admin();
        admin.setUserName("testAdmin");
        session.setAttribute("admin", admin);
        this.mockMvc.perform(get("/userName").session(session)).andExpect(content().string("testAdmin"));
        session.clearAttributes();
        Dealer dealer = new Dealer();
        dealer.setUserName("dealerName");
        session.setAttribute("dealer",dealer);
        this.mockMvc.perform(get("/userName").session(session)).andExpect(content().string("dealerName"));
        session.clearAttributes();
        this.mockMvc.perform(get("/userName").session(session)).andExpect(content().string("NULL"));

    }
}