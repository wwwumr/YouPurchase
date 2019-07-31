package com.sjtu.adminanddealer.entity;

import javax.persistence.*;

/**
 * 管理员可以自己添加的酒类别
 *
 * @author Chuyuxuan
 */
@Entity
public class Alcohol {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "alcoholId")
    private Long alcoholId;

    private String alcoholInfo;

    private boolean available;

    private String coverPicUrl;

    // 酒的度数(滑稽.jpg
    private Short degree;

    public Alcohol() {
    }

    public Alcohol(String alcoholInfo, boolean available, String coverPicUrl, Short degree) {
        this.alcoholInfo = alcoholInfo;
        this.available = available;
        this.coverPicUrl = coverPicUrl;
        this.degree = degree;
    }

    public Long getAlcoholId() {
        return alcoholId;
    }

    public void setAlcoholId(Long alcoholId) {
        this.alcoholId = alcoholId;
    }

    public String getAlcoholInfo() {
        return alcoholInfo;
    }

    public void setAlcoholInfo(String alcoholInfo) {
        this.alcoholInfo = alcoholInfo;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getCoverPicUrl() {
        return coverPicUrl;
    }

    public void setCoverPicUrl(String coverPicUrl) {
        this.coverPicUrl = coverPicUrl;
    }

    public Short getDegree() {
        return degree;
    }

    public void setDegree(Short degree) {
        this.degree = degree;
    }
}
