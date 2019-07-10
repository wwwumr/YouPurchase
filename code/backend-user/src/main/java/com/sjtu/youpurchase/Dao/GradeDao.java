package com.sjtu.youpurchase.Dao;

import com.sjtu.youpurchase.entity.Grade;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface GradeDao extends CrudRepository<Grade,String> {
    //按照商店来显示评价
    public List<Grade> findByStoreIdAndValid(long storeId, boolean valid);
}
