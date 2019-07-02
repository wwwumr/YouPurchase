package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.DTO.StoreResponseDTO;
import com.sjtu.youpurchase.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 店铺信息相关的controller.
 *
 * @author Chuyuxuan
 */
@RestController("/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    /**
     * 对应用GET请求请求/stores，得到所有的商店信息
     *
     * @return 所有商店信息的列表
     * @see StoreResponseDTO
     */
    @GetMapping
    public List<StoreResponseDTO> getAllStores() {
        return storeService.getAllStores();
    }

}
