package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.entity.Alcohol;
import com.sjtu.adminanddealer.parameter.NewAlcoholParameter;
import com.sjtu.adminanddealer.service.AlcoholService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 管理员对酒类商品的管理
 *
 * @author Chuyuxuan
 */
@RestController
public class AlcoholController {

    @Autowired
    private AlcoholService alcoholService;

    /**
     * 管理员获取所有的酒类
     *
     * @return 所有的酒类商品信息
     */
    @GetMapping("/api/a/alcohol")
    public List<Alcohol> getAllAlcohol() {
        return alcoholService.getAll();
    }

    /**
     * 管理员添加酒类商品
     *
     * @param parameter 获取用到的参数
     * @return 新的酒类的id
     */
    @PostMapping("/api/a/alcohol")
    public Long add(@RequestBody NewAlcoholParameter parameter) {
        return alcoholService.add(parameter);
    }

    /**
     * 管理员修改酒类商品
     *
     * @param parameter 修改的酒类商品属性
     * @return 成功返回UPDATE
     */
    @PutMapping("/api/a/alcohol")
    public String update(@RequestBody NewAlcoholParameter parameter) {
        alcoholService.update(parameter);
        return "UPDATE";
    }

    /**
     * 管理员删除酒类商品
     *
     * @param alcoholId 酒类商品的id
     * @return DELETE
     */
    @DeleteMapping("/api/a/alcohol")
    public String delete(@RequestBody Long alcoholId) {
        alcoholService.deleteById(alcoholId);
        return "DELETE";
    }

    /**
     * 经销商获取所有的酒商品信息
     *
     * @return 所有的酒商品信息
     */
    @GetMapping("/api/d/alcohol")
    public List<Alcohol> getAllAlcoholDealer() {
        return alcoholService.getAll();
    }

    /**
     * 修改酒类商品的图片
     *
     * @param file        上传的图片
     * @param alcoholId   酒类商品的id
     * @param coverPicUrl 原来图片的url
     * @return 成功返回新的图片的url
     */
    @PostMapping("/api/a/alcohol/cover")
    public String updateAlcoholCoverPic(@RequestParam("file") MultipartFile file, @RequestParam("key") Long alcoholId,
                                        @RequestParam("coverPicUrl") String coverPicUrl) {
        return alcoholService.updateAlcoholCoverPic(file, alcoholId, coverPicUrl);
    }

    @GetMapping("/api/ad/alcohol")
    public Alcohol getAlcoholById(@RequestParam("alcoholId") Long alcoholId) {
        return alcoholService.getById(alcoholId);
    }
}
