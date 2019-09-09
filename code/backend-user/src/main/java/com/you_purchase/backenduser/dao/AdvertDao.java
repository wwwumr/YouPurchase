package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.Advert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AdvertDao extends CrudRepository<Advert,String> {
    public Advert findByAdvertId(long advertId);

    @Query(value = "select advert_id from advert order by advert_id desc limit 1",nativeQuery = true)
    long advertFind();
}
