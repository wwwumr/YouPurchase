package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 经销商信息相关的controller
 *
 * @author Chuyuxuan
 */
@RestController
@RequestMapping("/dealers")
public class DealerController {

    @Autowired
    private DealerService dealerService;

    /**
     * 前端请求所有经销商的基本信息，发送的数据格式是JSON数组，内容见{@link DealerDTO}.
     *
     * @return 所有经销商信息的JSON数组
     */
    @GetMapping
    public List<DealerDTO> getAllDealers() {
        return dealerService.getAllDealers();
    }

    /**
     * 通过经销商的id请求对应的经销商信息.
     *
     * @param dealerId 经销商id
     * @return 对应id的经销商信息
     */
    @GetMapping("/{dealerId}")
    public DealerDTO getDealerByDealerId(@PathVariable("dealerId") Long dealerId) {
        return dealerService.getDealerByDealerId(dealerId);
    }

    /**
     * 新建一个经销商.
     *
     * @param data 解析类型为DealerRequestDTO
     * @return 一个JSON, 包括新建的经销商id和头像url ,格式为{"key" : long, "avatar" : String}
     */
    @PostMapping
    public JSONObject addNewDealer(@RequestBody DealerParameter data) {

        return dealerService.addADealer(data);
    }

    /**
     * 修改经销商信息.
     *
     * @param data 前端发送的修改后的经销商信息
     * @return 修改成功返回“saved”
     */
    @PutMapping
    public String updateDealer(@RequestBody DealerParameter data) {
        dealerService.updateDealer(data);
        return "saved";
    }

    /**
     * 删除经销商信息.
     *
     * @param data 前端发送的需要删除的经销商数据，类型为包含Long的Array
     * @return 删除成功返回DELETE
     */
    @DeleteMapping
    public String deleteDealer(@RequestBody List<Long> data) {
        for (Long id : data
        ) {
            dealerService.deleteDealer(id);
        }
        return "DELETE";
    }

    /**
     * 获取所有未绑定的店铺
     *
     * @return 所有未绑定的店铺信息
     */
    @GetMapping("/unbindStores")
    public List<StoreDTO> getAllUnbindStore() {
        return dealerService.getAllUnbindStore();
    }

    @PostMapping("/avatar")
    public String updateDealerAvatar(@RequestParam("file") MultipartFile file, @RequestParam("key") Long dealerId,
                                     @RequestParam("avatar") String avatar) {
        if (file == null) {
            return "ERROR";
        }
        String newAvatar = dealerService.updateDealerAvatar(file, dealerId, avatar);
        return newAvatar;
    }
}
