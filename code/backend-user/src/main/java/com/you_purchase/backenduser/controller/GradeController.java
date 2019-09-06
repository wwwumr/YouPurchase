package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.dto.GradeDTO;
import com.you_purchase.backenduser.parameter.GradeParameter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@Api(tags = "用户评价接口相关")
public class GradeController extends BaseController {

    // /用户新增评论
    @RequestMapping(value = "/grade/add",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "用户新增评价")
    int GradeAdd(@RequestBody GradeParameter gradeParameter, HttpSession session){
        if(session.getAttribute("userId") == null){
            return 403;
        }
        return gradeService.GradeAdd(gradeParameter);
    }

    //查看评论
    @RequestMapping(value = "/grade/show",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户查看商户评价")
    List<GradeDTO> showGrade(long storeId){
        return gradeService.GradeShow(storeId);
    }

    //删除评论
    @RequestMapping(value = "/grade/delete",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "删除评论")
    int GradeDelete(long gradeId){return gradeService.GradeDelete(gradeId);}
}
