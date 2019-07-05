package com.sjtu.youpurchase.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.youpurchase.DTO.StoreDTO;
import com.sjtu.youpurchase.parameter.StoreParameter;
import com.sjtu.youpurchase.service.StoreService;
import com.sjtu.youpurchase.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 店铺信息相关的controller.
 *
 * @author Chuyuxuan
 */
@RestController
@RequestMapping("/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    /**
     * 对应用GET请求请求/stores，得到所有的商店信息
     *
     * @return 所有商店信息的列表
     * @see StoreDTO
     */
    @GetMapping
    public List<StoreDTO> getAllStores() {
        return storeService.getAllStores();
    }

    /**
     * 新建一个店铺信息，数据内容以post请求
     * @param data 前端Post的数据
     * @return 一个JSON，格式为{"key" : long, "coverUrl" : String}
     */
    @PostMapping
    public JSONObject addStore(@RequestBody StoreParameter data){
        return storeService.addAStore(data);
    }

    @PostMapping("/coverPic")
    public String uploadCoverPic(@RequestParam("file") MultipartFile file){
        System.out.println(FileUploadUtil.getFileUploadUtil().saveFile(file));
        return "ok";
    }
}
