package com.sjtu.adminanddealer.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * 读取图片的controller，请求时将图片<img />的src属性填入对应文件的url即可
 * 比如数据库中文件保存的有一个url，然后加上
 *
 * @author Chuyuxuan
 */
@RestController
@RequestMapping("/images")
public class ImageController {
    // TODO: 获取图片的路径与url这块逻辑比较乱，可以修改

    @Value("${imageBaseDirectory}")
    private String IMAGE_BASE_DIRECTORY;

    @GetMapping(value = "/{picUrl}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE})
    public byte[] getImage(@PathVariable("picUrl")String picUrl) throws IOException {
        File file = new File(IMAGE_BASE_DIRECTORY+picUrl);
        FileInputStream inputStream = new FileInputStream(file);
        byte[] bytes = new byte[inputStream.available()];
        inputStream.read(bytes, 0, inputStream.available());
        return bytes;
    }
}
