package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.DTO.GradeDTO;
import com.sjtu.youpurchase.parameter.GradeParameter;
import com.sjtu.youpurchase.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

public class GradeController {
    @Autowired
    GradeService gradeService;

    //用户评论
    @RequestMapping(value="grade/grade",method = RequestMethod.POST)
    public
    @ResponseBody
    GradeDTO UserGrade(@RequestBody GradeParameter gradeParameter){
        return gradeService.UserGrade(gradeParameter);
    }

    //获取商店评论
    @RequestMapping(value = "value/showStore",method = RequestMethod.GET)
    public
    @ResponseBody
    List<GradeDTO> ShowStoreGrade(long storeId){return gradeService.ShowStoreGrade(storeId);}

}
