package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Alcohol;

import java.util.List;

/**
 * 酒类商品的数据访问层
 */
public interface AlcoholDao {

    List<Alcohol> getAllAlcohol();

    Alcohol getById(Long alcoholId);

    void update(Alcohol alcohol);

    Long add(Alcohol alcohol);

    void deleteById(Long alcoholId);

    void updateAlcoholCover(String newUrl, Long alcoholId);

}
