package com.you_purchase.backenduser.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.*;

/**
 * 商品的分类描述
 */
@Entity
public class CommodityClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commodityClassId;

    @JoinColumn(name = "storeId")
    private Long storeId;


    private String classInfo;

    public Long getCommodityClassId() {
        return commodityClassId;
    }

    public void setCommodityClassId(Long commodityClassId) {
        this.commodityClassId = commodityClassId;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }


    public String getClassInfo() {
        return classInfo;
    }

    public void setClassInfo(String classInfo) {
        this.classInfo = classInfo;
    }
}
