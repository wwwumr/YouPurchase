package com.you_purchase.backenduser.service;


import com.you_purchase.backenduser.dto.GradeDTO;
import com.you_purchase.backenduser.entity.Grade;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.GradeParameter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GradeService extends BaseService {
    // 用户新增评论
    public int GradeAdd(GradeParameter gradeParameter){
        Grade grade = new Grade();
        grade.setInfo(gradeParameter);
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(gradeParameter.getOrderInfoId(),true);
        orderInfo.setJudged(true);
        orderInfoDao.save(orderInfo);
        gradeDao.save(grade);
        return 200;
    }
    //查看对应商店所有评价
    public List<GradeDTO> GradeShow(long storeId){
        List<Grade> grades = gradeDao.findByStoreIdAndValid(storeId,true);
        if(grades == null){
            return null;
        }
        List<GradeDTO> gradeDTOS = new ArrayList<>();
        for(Grade s:grades){
            GradeDTO gradeDTO = new GradeDTO();
            gradeDTO.setScore(s.getScore());
            gradeDTO.setCreateDate(s.getCreateDate());
            gradeDTO.setContent(s.getContent());
            User user = userDao.findByUserId(s.getUserId());
            gradeDTO.setUserName(user.getUserName());
            gradeDTOS.add(gradeDTO);
        }
        return gradeDTOS;
    }

    //删除评论
    public int GradeDelete(long gradeId){
        Grade grade = gradeDao.findByGradeIdAndValid(gradeId,true);
        if(grade == null){
            //System.out.println("该评论不存在或已删除");
            return 403;
        }
        grade.setValid(false);
        gradeDao.save(grade);
        return 200;
    }
}
