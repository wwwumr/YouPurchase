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
@RequestMapping("/image")
public class ImageController {
    /*
     * 数据库中所有的图片url，都是image/123456.jpg这种格式
     * 这样在前端请求的时候，用主机的root路径加上这个字符串就可以请求到相应图片了 */

    @Value("${imageBaseDirectory}")
    private String IMAGE_BASE_DIRECTORY;

    @GetMapping(value = "/{picUrl}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE})
    public byte[] getImage(@PathVariable("picUrl") String picUrl) throws IOException {
        File file = null;
        FileInputStream inputStream = null;
        byte[] bytes = null;
        try{
            file = new File(IMAGE_BASE_DIRECTORY + picUrl);
            inputStream = new FileInputStream(file);
            bytes = new byte[inputStream.available()];
            inputStream.read(bytes, 0, inputStream.available());
        } catch (Exception e){
            e.printStackTrace();
        } finally {
            try {
                inputStream.close();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
        return bytes;
    }
}
