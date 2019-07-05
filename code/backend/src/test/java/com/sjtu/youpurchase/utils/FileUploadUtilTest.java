package com.sjtu.youpurchase.utils;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class FileUploadUtilTest {

//    @Autowired
//    private FileUploadUtil util;

    @Test
    public void getFileUploadUtil() {
        Assert.assertNotNull(FileUploadUtil.getFileUploadUtil());
        // TODO: 无法读取配置文件
    }

}