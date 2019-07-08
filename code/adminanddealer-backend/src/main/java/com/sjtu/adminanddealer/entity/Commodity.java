package com.sjtu.adminanddealer.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * 商品信息对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Commodity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "commodityId")
    private Long commodityId;

    @Column(scale = 2)
    private double price;

    private String commodityInfo;

    @ElementCollection
    @CollectionTable(name = "commodityPicUrls",
            joinColumns = {@JoinColumn(name = "commodityId", referencedColumnName = "commodityId")})
    private List<String> commodityPicUrls;

    private Boolean onShelves;

    private Integer inventory;

    /* constructor */
    public Commodity() {
    }

    public Commodity(double price, String commodityInfo, List<String> commodityPicUrls, Boolean onShelves, Integer inventory) {
        this.price = price;
        this.commodityInfo = commodityInfo;
        this.commodityPicUrls = commodityPicUrls;
        this.onShelves = onShelves;
        this.inventory = inventory;
    }

    /* getter and setter */
    public Long getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(Long commodityId) {
        this.commodityId = commodityId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCommodityInfo() {
        return commodityInfo;
    }

    public void setCommodityInfo(String commodityInfo) {
        this.commodityInfo = commodityInfo;
    }

    public List<String> getCommodityPicUrls() {
        return commodityPicUrls;
    }

    public void setCommodityPicUrls(List<String> commodityPicUrls) {
        this.commodityPicUrls = commodityPicUrls;
    }

    public Boolean getOnShelves() {
        return onShelves;
    }

    public void setOnShelves(Boolean onShelves) {
        this.onShelves = onShelves;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }
}
