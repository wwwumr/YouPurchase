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

    @GetMapping("/api/a/alcohol")
    public List<Alcohol> getAllAlcohol() {
        return alcoholService.getAll();
    }

    @PostMapping("/api/a/alcohol")
    public Long add(NewAlcoholParameter parameter) {
        return alcoholService.add(parameter);
    }

    @DeleteMapping("/api/a/alcohol")
    public String delete(@RequestParam("id") Long alcoholId) {
        alcoholService.deleteById(alcoholId);
        return "DELETE";
    }
}
