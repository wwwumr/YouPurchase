package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
     * @return 新建成功返回"saved"
     */
    @PostMapping
    public Long addNewDealer(@RequestBody DealerParameter data) {

        return dealerService.addADealer(data);
    }

    /**
     * 修改经销商信息
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
     * 获取所有未绑定的店铺
     *
     * @return 所有未绑定的店铺信息
     */
    @GetMapping("/unbindStores")
    public List<StoreDTO> getAllUnbindStore() {
        return dealerService.getAllUnbindStore();
    }
}