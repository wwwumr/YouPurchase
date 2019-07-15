package com.you_purchase.backenduser.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
 * @author Chuyuxuan
 */
@RestController
@Api(tags = "头像获取")
public class ImageController {


    @Value("${imageBaseDirectory}")
    private String IMAGE_BASE_DIRECTORY;

    @ApiOperation(value = "用户获取头像")
    @GetMapping(value = "/user/getPhoto", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE})
    public byte[] getImage(@PathVariable("picUrl") String picUrl) throws IOException {
        File file = null;
        FileInputStream inputStream = null;
        byte[] bytes = null;
        try {
            file = new File(IMAGE_BASE_DIRECTORY + picUrl);
            inputStream = new FileInputStream(file);
            bytes = new byte[inputStream.available()];
            inputStream.read(bytes, 0, inputStream.available());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                inputStream.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return bytes;
    }
}
