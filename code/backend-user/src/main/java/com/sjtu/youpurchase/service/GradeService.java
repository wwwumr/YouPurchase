package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.GradeDTO;
import com.sjtu.youpurchase.parameter.GradeParameter;
import java.util.List;

public interface GradeService {
    //用户评价
    GradeDTO UserGrade(GradeParameter gradeParameter);
    //显示某一商店的所有评论
   /* List<GradeDTO> ShowStoreGrade(long storeId);*/
}
