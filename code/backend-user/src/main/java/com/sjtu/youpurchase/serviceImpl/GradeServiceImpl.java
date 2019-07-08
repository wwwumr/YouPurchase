package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.GradeDTO;
import com.sjtu.youpurchase.Dao.GradeDao;
import com.sjtu.youpurchase.entity.Grade;
import com.sjtu.youpurchase.parameter.GradeParameter;
import com.sjtu.youpurchase.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;

public class GradeServiceImpl implements GradeService {

    @Autowired
    GradeDao gradeDao;
    //用户新增评价
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
}
