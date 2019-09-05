package com.sjtu.adminanddealer.entity;

import javax.persistence.*;

/**
 * 商品的分类描述
 */
@Entity
public class CommodityClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commodityClassId;

    private String classInfo;

    public Long getCommodityClassId() {
        return commodityClassId;
    }

    public void setCommodityClassId(Long commodityClassId) {
        this.commodityClassId = commodityClassId;
    }


    public String getClassInfo() {
        return classInfo;
    }

    public void setClassInfo(String classInfo) {
        this.classInfo = classInfo;
    }
}
