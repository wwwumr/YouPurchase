package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.SortedStoreDTO;
import com.sjtu.adminanddealer.DTO.StoreAddressDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.StoreAddressParameter;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import com.sjtu.adminanddealer.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * 店铺信息相关的controller.
 *
 * @author Chuyuxuan
 */
@CrossOrigin
@RestController
public class StoreController {

    @Autowired
    private StoreService storeService;

    /**
     * 对应用GET请求请求/stores，得到所有的商店信息
     *
     * @return 所有商店信息的列表
     * @see StoreDTO
     */
    @GetMapping("/api/a/stores")
    public List<StoreDTO> getAllStores() {
        return storeService.getAllStores();
    }

    /**
     * 用店铺的id请求店铺的信息
     *
     * @param storeId 店铺的id
     * @return 对应id的店铺信息
     */
    @GetMapping("/api/au/stores/{storeId}")
    public StoreDTO getStoreByStoreId(@PathVariable("storeId") Long storeId) {
        return storeService.getStoreByStoreId(storeId);
    }

    /**
     * 管理员用店铺的id请求店铺的信息
     *
     * @param storeId 店铺的id
     * @return 对应id的店铺信息
     */
    @GetMapping("/api/a/stores/{storeId}")
    public StoreDTO getStoreByStoreIdByAdmin(@PathVariable("storeId") Long storeId) {
        return storeService.getStoreByStoreId(storeId);
    }

    /**
     * 用户用店铺的id请求店铺的信息
     *
     * @param storeId 店铺的id
     * @return 对应id的店铺信息
     */
    @GetMapping("/api/u/stores/{storeId}")
    public StoreDTO getStoreByStoreIdByUser(@PathVariable("storeId") Long storeId) {
        return storeService.getStoreByStoreId(storeId);
    }

    /**
     * 新建一个店铺信息，数据内容以post请求
     *
     * @param data 前端Post的数据
     * @return 一个JSON，格式为{"key" : long, "coverPicUrl" : String}
     */
    @PostMapping("/api/a/stores")
    public JSONObject addStore(@RequestBody StoreParameter data) {
        return storeService.addAStore(data);
    }

    /**
     * 修改一个店铺的信息
     *
     * @param data 前端PUT请求从requestBody发送的数据
     * @return JSON 格式为{"key" : long},返回的key为-1时代表失败
     */
    @PutMapping("/api/ad/stores")
    public JSONObject updateStore(@RequestBody StoreParameter data) {
        storeService.updateStore(data);
        storeService.bindDealerAndStore(data.getDealerId(), data.getKey());
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", data.getKey());
        return jsonObject;
    }

    /**
     * 修改一个店铺的信息
     *
     * @param data 前端PUT请求从requestBody发送的数据
     * @return JSON 格式为{"key" : long},返回的key为-1时代表失败
     */
    @PutMapping("/api/a/stores")
    public JSONObject updateStoreByAdmin(@RequestBody StoreParameter data) {
        storeService.updateStore(data);
        storeService.bindDealerAndStore(data.getDealerId(), data.getKey());
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", data.getKey());
        return jsonObject;
    }

    /**
     * 修改一个店铺的信息
     *
     * @param data 前端PUT请求从requestBody发送的数据
     * @return JSON 格式为{"key" : long},返回的key为-1时代表失败
     */
    @PutMapping("/api/d/stores")
    public JSONObject updateStoreByDealer(@RequestBody StoreParameter data) {
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
    @DeleteMapping("/api/a/stores")
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
    @GetMapping("/api/a/stores/bind")
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
    @GetMapping("/api/a/stores/unbind")
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
    @GetMapping("/api/a/stores/unbindStores")
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
    @PostMapping("/api/ad/stores/cover")
    public String updateStoreCover(@RequestParam("file") MultipartFile file, @RequestParam("key") Long storeId,
                                   @RequestParam("coverPicUrl") String coverPicUrl) {
        if (file == null) {
            return "ERROR";
        }
        String newUrl = storeService.updateStoreCoverPic(file, storeId, coverPicUrl);
        return newUrl;

    }

    /**
     * 更新店铺的封面图片，调用者为管理员或者经销商.
     *
     * @param file        上传的新的图片文件
     * @param storeId     需要修改的店铺id
     * @param coverPicUrl 原来的封面url
     * @return 修改成功返回"update"
     */
    @PostMapping("/api/a/stores/cover")
    public String updateStoreCoverByAdmin(@RequestParam("file") MultipartFile file, @RequestParam("key") Long storeId,
                                   @RequestParam("coverPicUrl") String coverPicUrl) {
        if (file == null) {
            return "ERROR";
        }
        String newUrl = storeService.updateStoreCoverPic(file, storeId, coverPicUrl);
        return newUrl;

    }

    /**
     * 更新店铺的封面图片，调用者为管理员或者经销商.
     *
     * @param file        上传的新的图片文件
     * @param storeId     需要修改的店铺id
     * @param coverPicUrl 原来的封面url
     * @return 修改成功返回"update"
     */
    @PostMapping("/api/d/stores/cover")
    public String updateStoreCoverByDealer(@RequestParam("file") MultipartFile file, @RequestParam("key") Long storeId,
                                   @RequestParam("coverPicUrl") String coverPicUrl) {
        if (file == null) {
            return "ERROR";
        }
        String newUrl = storeService.updateStoreCoverPic(file, storeId, coverPicUrl);
        return newUrl;

    }

    /**
     * 修改店铺的配送方式接口
     *
     * @param type    配送方式，0表示自己配送；1表示外部配送
     * @param storeId 店铺id
     * @return UPDATE
     */
    @GetMapping("/api/ad/stores/delivery")
    public String updateDelivery(@RequestParam("deliveryType") Integer type, @RequestParam("storeId") Long storeId) {
        storeService.updateStoreDeliveryType(type, storeId);
        return "UPDATE";
    }

    /**
     * 经销商登陆后，从session中用storeId获取店铺的信息
     *
     * @param session session
     * @return 店铺信息
     */
    @GetMapping("/api/d/stores/dealer/store")
    public StoreDTO getStoreInfo(HttpSession session) {
        if (session.getAttribute("storeId") != null) {
            return storeService.getStoreByStoreId((Long) session.getAttribute("storeId"));
        }
        return null;
    }

    /**
     * 店铺排序
     * 给前端三个指标。在配送范围内的商家的距离，销量，评分
     *
     * @param longitude 用户坐标：经度
     * @param latitude  用户坐标：纬度
     * @return 一个包含SortedStoreDTO的列表
     */
    @GetMapping("/stores/sort")
    public List<SortedStoreDTO> getSortedStores(@RequestParam("longitude") double longitude,
                                                @RequestParam("latitude") double latitude) {
        return storeService.getSortedStores(longitude, latitude);
    }

    /**
     * 经销商获取地理位置信息
     * @param session session
     * @return 店铺的位置和经纬度
     */
    @GetMapping("/api/d/stores/address")
    public StoreAddressDTO getStoreAddress(HttpSession session){
        Long storeId = (Long) session.getAttribute("storeId");
        if (storeId != null) {
            storeService.getStoreAddress(storeId);
        }
        return new StoreAddressDTO();
    }

    /**
     * 修改店铺的地址
     * 经销商登录后，通过session中储存的店铺id和前端传过来的新的地址信息修改地址
     *
     * @param parameter 新的地址信息
     * @param session   session
     * @return string，成功返回UPDATE，失败返回ERROR
     */
    @PutMapping("/api/d/stores/address")
    public String updateStoreAddress(@RequestBody StoreAddressParameter parameter, HttpSession session) {
        Long storeId = (Long) session.getAttribute("storeId");
        if (storeId != null) {
            storeService.updateStoreAddress(parameter, storeId);
            return "UPDATE";
        }
        return "ERROR";
    }
}
