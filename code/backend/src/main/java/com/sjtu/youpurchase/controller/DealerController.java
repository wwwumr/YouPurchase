package com.sjtu.youpurchase.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.youpurchase.DTO.DealerRequestDTO;
import com.sjtu.youpurchase.DTO.DealerResponseDTO;
import com.sjtu.youpurchase.service.DealerService;
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
     * 前端请求所有经销商的基本信息，发送的数据格式是JSON数组，内容见{@link DealerResponseDTO}
     *
     * @return 所有经销商信息的JSON数组
     */
    @GetMapping
    public List<DealerResponseDTO> getAllDealers() {
        return dealerService.getAllDealers();
    }

    /**
     * 新建一个经销商
     *
     * @param data 解析类型为DealerRequestDTO
     * @return 新建成功返回"saved"
     */
    @PostMapping
    public String addNewDealer(@RequestBody DealerRequestDTO data) {
        dealerService.addADealer(data);
        return "saved";
    }

    /**
     * 修改经销商信息
     *
     * @param data 前端发送的修改后的经销商信息
     * @return 修改成功返回“saved”
     */
    @PutMapping
    public String updateDealer(@RequestBody DealerRequestDTO data) {
        dealerService.updateDealer(data);
        return "saved";
    }
}
