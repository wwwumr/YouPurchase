package com.sjtu.youpurchase.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.youpurchase.DTO.StoreDTO;
import com.sjtu.youpurchase.parameter.StoreParameter;
import com.sjtu.youpurchase.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 店铺信息相关的controller.
 *
 * @author Chuyuxuan
 */
@CrossOrigin
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
     *
     * @param data 前端Post的数据
     * @return 一个JSON，格式为{"key" : long, "coverUrl" : String}
     */
    @PostMapping
    public JSONObject addStore(@RequestBody StoreParameter data) {
        return storeService.addAStore(data);
    }

    /**
     * 绑定经销商与店铺
     *
     * @param dealerId 经销商id
     * @param storeId  店铺id
     * @return
     */
    @GetMapping("/bind")
    public String bindDealerAndStore(@RequestParam("dealerId") Long dealerId,
                                     @RequestParam("storeId") Long storeId) {
        // TODO:当经销商或者商店已经被绑定时返回提示信息
        storeService.bindDealerAndStore(dealerId, storeId);
        return "bind";
    }

    /**
     * 解除经销商与店铺的绑定
     *
     * @param dealerId 经销商id
     * @param storeId  店铺id
     * @return 解除绑定成功返回"unbind"
     */
    @GetMapping("/unbind")
    public String unbindDealerAndStore(@RequestParam("dealerId") Long dealerId,
                                       @RequestParam("storeId") Long storeId) {
        storeService.bindDealerAndStore(dealerId, storeId);
        return "unbind";
    }


//    / test
//    @PostMapping("/coverPic")
//    public String uploadCoverPic(@RequestParam("file") MultipartFile file){
//        System.out.println(FileUploadUtil.getFileUploadUtil().saveFile(file));
//        return "ok";
//    }
//
//    @DeleteMapping("/coverPic")
//    public String deleteCoverPic(@RequestParam("fileUrl") String fileUrl){
//        System.out.println(FileUploadUtil.getFileUploadUtil().deleteFile(fileUrl));
//        return "ok";
//    }
}
