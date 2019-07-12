package com.sjtu.adminanddealer.controller;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.Assert.*;
/**
 * ImageController的单元测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = {ImageController.class})
@AutoConfigureMockMvc
public class ImageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ImageController imageController;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(imageController);
    }

    // TODO:获取图片的逻辑不太好写单元测试，一般可以通过PostMan手动测试

}