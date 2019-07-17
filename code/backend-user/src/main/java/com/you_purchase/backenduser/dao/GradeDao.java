package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Grade;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GradeDao extends CrudRepository<Grade,String> {

    public List<Grade> findByStoreIdAndValid(long storeId,boolean valid);
    public Grade findByGradeIdAndValid(long gradeId,boolean valid);

}
