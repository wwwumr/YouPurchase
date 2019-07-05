package com.sjtu.youpurchase.utils;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class FileUploadUtilTest {

    @Test
    public void getFileUploadUtil() {
        Assert.assertNotNull(FileUploadUtil.getFileUploadUtil());
        // TODO: 无法读取配置文件
    }

}