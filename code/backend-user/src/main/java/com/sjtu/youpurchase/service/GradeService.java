package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.GradeDTO;
import com.sjtu.youpurchase.controller.BaseController;
import com.sjtu.youpurchase.entity.Grade;
import com.sjtu.youpurchase.parameter.GradeParameter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService extends BaseService{
    //用户评价
    public GradeDTO UserGrade(GradeParameter gradeParameter){
        Grade grade = new Grade();
        grade.setInfo(gradeParameter);
        gradeDao.save(grade);
        return new GradeDTO(grade);
    }

    //显示对应店铺的评论
/*    public List<GradeDTO> ShowStoreGrade(long storeId){
        List<Grade> grade = gradeDao.findByStoreIdAndValid(storeId,true);
        if(grade == null){
            Constrain.log("没有评论");
            return null;
        }
        return grade;
    }*/

    //显示某一商店的所有评论
   /* List<GradeDTO> ShowStoreGrade(long storeId);*/
}
