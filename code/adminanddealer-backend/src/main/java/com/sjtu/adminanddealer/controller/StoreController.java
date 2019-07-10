package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import com.sjtu.adminanddealer.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
     * 用店铺的id请求店铺的信息
     *
     * @param storeId 店铺的id
     * @return 对应id的店铺信息
     */
    @GetMapping("/{storeId}")
    public StoreDTO getStoreByStoreId(@PathVariable("storeId") Long storeId) {
        return storeService.getStoreByStoreId(storeId);
    }

    /**
     * 新建一个店铺信息，数据内容以post请求
     *
     * @param data 前端Post的数据
     * @return 一个JSON，格式为{"key" : long, "coverPicUrl" : String}
     */
    @PostMapping
    public JSONObject addStore(@RequestBody StoreParameter data) {
        return storeService.addAStore(data);
    }

    /**
     * 修改一个店铺的信息
     *
     * @param data 前端PUT请求从requestBody发送的数据
     * @return JSON 格式为{"key" : long},返回的key为-1时代表失败
     */
    @PutMapping
    public JSONObject updateStore(@RequestBody StoreParameter data) {
        storeService.updateStore(data);
        storeService.bindDealerAndStore(data.getDealerId(), data.getKey());
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", data.getKey());
        return jsonObject;
    }

    /**
     * 删除店铺信息.
     * 前端一般传过来的是一个包含所有需要删除的数组，并且已经做好了绑定检查.
     *
     * @param data 前端传过来的需要删除的店铺Id列表
     * @return 删除成功返回DELETE
     */
    @DeleteMapping
    public String deleteStore(@RequestBody List<Long> data) {
        for (Long id : data
        ) {
            storeService.deleteStore(id);
        }
        return "DELETE";
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
        storeService.unbindDealerAndStore(dealerId, storeId);
        return "unbind";
    }

    /**
     * 获取所有未绑定的店铺
     *
     * @return 所有未绑定的店铺信息
     */
    @GetMapping("/unbindStores")
    public List<StoreDTO> getAllUnbindStore() {
        return storeService.getAllUnbindStore();
    }

    /**
     * 更新店铺的封面图片，调用者为管理员或者经销商.
     *
     * @param file        上传的新的图片文件
     * @param storeId     需要修改的店铺id
     * @param coverPicUrl 原来的封面url
     * @return 修改成功返回"update"
     */
    @PostMapping("/cover")
    public String updateStoreCover(@RequestParam("file") MultipartFile file, @RequestParam("key") Long storeId,
                                   @RequestParam("coverPicUrl") String coverPicUrl) {
        if (file == null) {
            return "ERROR";
        }
        String newUrl = storeService.updateStoreCoverPic(file, storeId, coverPicUrl);
        return newUrl;

    }

}
