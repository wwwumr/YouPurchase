package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.entity.Alcohol;
import com.sjtu.adminanddealer.parameter.NewAlcoholParameter;
import com.sjtu.adminanddealer.service.AlcoholService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Long add(NewAlcoholParameter parameter) {
        return alcoholService.add(parameter);
    }

    /**
     * 管理员删除酒类商品
     *
     * @param alcoholId 酒类商品的id
     * @return DELETE
     */
    @DeleteMapping("/api/a/alcohol")
    public String delete(@RequestParam("id") Long alcoholId) {
        alcoholService.deleteById(alcoholId);
        return "DELETE";
    }
}
