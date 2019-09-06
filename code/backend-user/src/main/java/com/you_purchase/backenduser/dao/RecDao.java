package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Recommend;
import org.springframework.data.repository.CrudRepository;

public interface RecDao extends CrudRepository<Recommend,String> {
    public Recommend findByUserId(long userId);
}
