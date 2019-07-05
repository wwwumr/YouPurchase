package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.GradeDTO;
import com.sjtu.youpurchase.dao.GradeDao;
import com.sjtu.youpurchase.entity.Grade;
import com.sjtu.youpurchase.parameter.GradeParameter;
import com.sjtu.youpurchase.service.GradeService;
import com.sjtu.youpurchase.utils.Constrain;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

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
    public List<GradeDTO> ShowStoreGrade(long storeId){
        List<GradeDTO> gradeDTOS = gradeDao.findByStoreIdAndValid(storeId,true);
        if(gradeDTOS == null){
            Constrain.log("没有评论");
            return null;
        }
        return gradeDTOS;
    }
}
