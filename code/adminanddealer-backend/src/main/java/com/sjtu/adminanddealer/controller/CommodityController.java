package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.DTO.CommodityShortageDTO;
import com.sjtu.adminanddealer.entity.CommodityClass;
import com.sjtu.adminanddealer.parameter.CommodityCheckParameter;
import com.sjtu.adminanddealer.parameter.CommodityParameter;
import com.sjtu.adminanddealer.service.CommodityService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
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
    @GetMapping("/api/u/stores/{storeId}/commodities")
    public List<CommodityDTO> getCommodityFromStore(@PathVariable("storeId") Long storeId) {
        return commodityService.getAllCommoditiesByStoreOnShelves(storeId);
    }

    /**
     * 经销商登录后，session中存在着storeId，可以从这个信息取得店铺的商品信息
     *
     * @param session session
     * @return 所有在这个经销商店铺中所有商品的信息
     */
    @GetMapping("/api/d/stores/commodities")
    public List<CommodityDTO> getCommoditiesFromStoreInSession(HttpSession session) {
        if (session.getAttribute("storeId") != null) {
            return commodityService.getAllCommoditiesByStore((Long) session.getAttribute("storeId"));
        }
        return null;
    }

    /**
     * 根据商品的id获取商品的信息.
     *
     * @param commodityId 商品id
     * @return 对应商品的信息，如果没有对应的id返回null
     */
    @GetMapping("/api/du/commodities/{commodityId}")
    public CommodityDTO getCommodityById(@PathVariable("commodityId") Long commodityId) {
        return commodityService.getCommodityById(commodityId);
    }

    /**
     * 新增商品信息的逻辑.
     *
     * @param data 前端发送的数据
     * @return JSON格式 {"key":新建商品的id(Long), "coverPicUrl":String}
     */
    @PostMapping("/api/d/commodities")
    public JSONObject addCommodity(@RequestBody CommodityParameter data, HttpSession session) {
        Long storeId = (Long) session.getAttribute("storeId");
        return commodityService.addACommodity(data, storeId);
    }

    /**
     * 修改商品信息.
     *
     * @param data 前端发送的数据
     * @return 更新成功返回UPDATE
     */
    @PutMapping("/api/d/commodities")
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
    @DeleteMapping("/api/d/commodities")
    public String deleteCommodities(@RequestBody List<Long> data, HttpSession session) {
        Long storeId = (Long) session.getAttribute("storeId");
        commodityService.deleteCommodities(data, storeId);
        return "DELETE";
    }

    /**
     * 通过一个商品id的数组请求商品的详细信息.
     *
     * @param data 元素为商品id的数组
     * @return 对应数组中id的商品信息
     */
    @PostMapping("/api/u/commodities/ids")
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

    /**
     * 修改商品的默认图片
     *
     * @param file        图片
     * @param commodityId 商品id
     * @param coverPicUrl 原来的图片路径
     * @return 成功返回新图片的url，失败返回error
     */
    @PostMapping("/api/d/commodities/cover")
    public String updateCommodityCoverPic(@RequestParam("file") MultipartFile file, @RequestParam("key") Long commodityId,
                                          @RequestParam("coverPicUrl") String coverPicUrl) {
        return commodityService.updateCommodityCoverPic(file, commodityId, coverPicUrl);
    }

    /**
     * 添加商品的描述图片
     *
     * @param file        图片
     * @param commodityId 商品id
     * @param picUrl      图片原url
     * @return 成功返回新图片的url， 失败返回error
     */
    @PostMapping("/api/d/commodities/pics")
    public String addCommodityPics(@RequestParam("file") MultipartFile file, @RequestParam("key") Long commodityId,
                                   @RequestParam("picUrl") String picUrl) {

        return commodityService.addCommodityPics(file, commodityId);
    }

    /**
     * 检查商品库存
     *
     * @param data 一个list，里面的数据为所有需要检查的商品id和需要的数量
     * @return 有库存不足的商品时，返回id和对应的实际库存
     */
    @PostMapping("/commodities/remaining/check")
    @ApiOperation(value = "没有使用的接口")
    public List<CommodityShortageDTO> checkRemaining(@RequestBody List<CommodityCheckParameter> data) {
        return commodityService.checkCommodityRemaining(data);
    }

    /**
     * 检查商品库存并直接减少库存
     *
     * @param data 一个list，里面的数据为所有需要检查的商品id和需要的数量
     * @return 有库存不足的商品时，返回id和对应的实际库存
     */
    @PostMapping("/commodities/remaining")
    @ApiOperation(value = "没有使用的接口")
    public List<CommodityShortageDTO> reduceCommodityInventory(@RequestBody List<CommodityCheckParameter> data) {
        return commodityService.decreaseCommodityInventory(data);
    }

    /**
     * 通过店铺id以及商品类别名获取商品信息
     *
     * @param storeId   店铺id
     * @param classInfo 商品类别信息
     * @return 返回满足条件的商品信息
     */
    @GetMapping("/api/du/commodities/store/{storeId}/class")
    public List<CommodityDTO> getCommoditiesFromStoreAndClass(@PathVariable("storeId") Long storeId, @RequestParam("classInfo") String classInfo) {
        return commodityService.getCommoditiesByStoreAndClass(storeId, classInfo);
    }

    //TODO: 有关商品类别的controller

    /**
     * 获取店铺中所有的商品类别
     *
     * @param storeId 店铺id
     * @return 对应店铺中所有的商品类别
     */
    @GetMapping("/api/du/commodity/classes")
    public List<CommodityClass> getAllClasses(@RequestParam("storeId") Long storeId) {
        return commodityService.getCommodityClassInStore(storeId);
    }

    /**
     * 经销商新增商品类别
     *
     * @param classInfo 商品类别名
     * @param session   session
     * @return 放回新生成的商品类别id
     */
    @PostMapping("/api/d/commodity/classes")
    public Long AddNewClass(@RequestParam("classInfo") String classInfo, HttpSession session) {
        Long storeId = (Long) session.getAttribute("storeId");
        if (storeId == null) {
            return -1L;
        }
        return commodityService.addNewCommodityClass(classInfo, storeId);
    }

    /**
     * 经销商通过商品类别id修改商品类别信息
     *
     * @param commodityClassId 商品类别id
     * @param newClassInfo     商品类别信息
     * @return UPDATE
     */
    @PutMapping("/api/d/commodity/classes")
    public String updateClass(@RequestParam("commodityClassId") Long commodityClassId, @RequestParam("classInfo") String newClassInfo) {
        commodityService.updateCommodityClass(commodityClassId, newClassInfo);
        return "UPDATE";
    }

    /**
     * 经销商删除商品类别信息
     *
     * @param commodityClassId 商品类别id
     * @return DELETE
     */
    @DeleteMapping("/api/d/commodity/classes")
    public String deleteClass(@RequestParam("commodityClassId") Long commodityClassId) {
        commodityService.deleteCommodityClass(commodityClassId);
        return "DELETE";
    }


}
