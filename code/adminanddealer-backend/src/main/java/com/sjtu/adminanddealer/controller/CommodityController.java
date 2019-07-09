package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 商品信息有关的controller
 *
 * @author Chuyuxuan
 */
@RestController
public class CommodityController {

    @Autowired
    private CommodityService commodityService;

    /**
     * 根据商店的id来获取商店里包含的全部商品信息.
     *
     * @param storeId 商店的id
     * @return 所有在这个商店中所有商品的信息
     */
    @GetMapping("/stores/{storeId}/commodities")
    public List<CommodityDTO> getCommodityFromStore(@PathVariable("storeId") Long storeId) {
        return commodityService.getAllCommoditiesByStore(storeId);
    }

    /**
     * 根据商品的id获取商品的信息.
     *
     * @param commodityId 商品id
     * @return 对应商品的信息，如果没有对应的id返回null
     */
    @GetMapping("/commodities/{commodityId}")
    public CommodityDTO getCommodityById(@PathVariable("commodityId") Long commodityId) {
        return commodityService.getCommodityById(commodityId);
    }

    //TODO: 增加商品与修改商品

}
