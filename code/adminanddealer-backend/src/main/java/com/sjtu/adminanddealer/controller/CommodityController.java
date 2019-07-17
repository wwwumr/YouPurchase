package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.parameter.CommodityParameter;
import com.sjtu.adminanddealer.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    /**
     * 新增商品信息的逻辑.
     *
     * @param data 前端发送的数据
     * @return JSON格式 {"key":新建商品的id(Long), "coverPicUrl":String}
     */
    @PostMapping("/commodities")
    public JSONObject addCommodity(@RequestBody CommodityParameter data) {
        return commodityService.addACommodity(data);
    }

    /**
     * 修改商品信息.
     *
     * @param data 前端发送的数据
     * @return 更新成功返回UPDATE
     */
    @PutMapping("/commodities")
    public String updateCommodity(@RequestBody CommodityParameter data) {
        commodityService.updateACommodity(data);
        return "UPDATE";
    }

    /**
     * 删除商品信息.
     *
     * @param data 需要删除的商品id
     * @return DELETE
     */
    @DeleteMapping("/commodities")
    public String deleteCommodities(@RequestBody List<Long> data) {
        for (Long id : data) {
            commodityService.deleteCommodity(id);
        }
        return "DELETE";
    }

    /**
     * 通过一个商品id的数组请求商品的详细信息.
     *
     * @param data 元素为商品id的数组
     * @return 对应数组中id的商品信息
     */
    @PostMapping("/commodities/ids")
    public List<CommodityDTO> getCommoditiesByIds(@RequestBody List<Long> data) {
        List<CommodityDTO> dtos = new ArrayList<>();
        for (Long id : data
        ) {
            CommodityDTO dto = commodityService.getCommodityById(id);
            if (dto != null) {
                dtos.add(dto);
            }
        }
        return dtos;
    }

}
