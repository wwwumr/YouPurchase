package com.you_purchase.backenduser.entity;

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

    private String commodityCoverPicUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "commodityPicUrls",
            joinColumns = {@JoinColumn(name = "commodityId", referencedColumnName = "commodityId")})
    private List<String> commodityPicUrls;

    private Boolean onShelves;

    private Integer inventory;

    private Integer remaining;

    @ManyToOne
    @JoinColumn(name = "commodityClassId")
    private CommodityClass commodityClass;

    /* constructor */
    public Commodity() {
    }

    public Commodity(double price, String commodityInfo, String commodityCoverPicUrl, Boolean onShelves, Integer inventory, Integer remaining) {
        this.price = price;
        this.commodityInfo = commodityInfo;
        this.commodityCoverPicUrl = commodityCoverPicUrl;
        this.onShelves = onShelves;
        this.inventory = inventory;
        this.remaining = remaining;
    }

    /* getter and setter */

    public CommodityClass getCommodityClass() {
        return commodityClass;
    }

    public void setCommodityClass(CommodityClass commodityClass) {
        this.commodityClass = commodityClass;
    }

    public String getCommodityCoverPicUrl() {
        return commodityCoverPicUrl;
    }

    public void setCommodityCoverPicUrl(String commodityCoverPicUrl) {
        this.commodityCoverPicUrl = commodityCoverPicUrl;
    }

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

    public Integer getRemaining() {
        return remaining;
    }

    public void setRemaining(Integer remaining) {
        this.remaining = remaining;
    }
}
