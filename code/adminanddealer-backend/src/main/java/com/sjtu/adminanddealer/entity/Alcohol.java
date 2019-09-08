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

    private Integer remaining;

    private double price;

    private String coverPicUrl;

    public Alcohol() {
    }

    public Alcohol(String alcoholInfo, Integer remaining, double price, String coverPicUrl) {
        this.alcoholInfo = alcoholInfo;
        this.remaining = remaining;
        this.price = price;
        this.coverPicUrl = coverPicUrl;
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

    public Integer getRemaining() {
        return remaining;
    }

    public void setRemaining(Integer remaining) {
        this.remaining = remaining;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCoverPicUrl() {
        return coverPicUrl;
    }

    public void setCoverPicUrl(String coverPicUrl) {
        this.coverPicUrl = coverPicUrl;
    }
}
