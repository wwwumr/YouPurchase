package com.sjtu.adminanddealer.DTO;

import com.sjtu.adminanddealer.entity.Commodity;

import java.util.List;

/**
 * 返回前端的商品信息格式.
 *
 * @author Chuyuxuan
 */
public class CommodityDTO {

    private Long key;

    private double price;

    private String commodityInfo;

    private String commodityCoverPicUrl;

    private List<String> commodityPicUrls;

    private boolean onShelves;

    private Integer inventory;

    private Integer remaining;

    public CommodityDTO() {
    }

    public CommodityDTO(Long key, double price, String commodityInfo, String commodityCoverPicUrl, List<String> commodityPicUrls, boolean onShelves, Integer inventory, Integer remaining) {
        this.key = key;
        this.price = price;
        this.commodityInfo = commodityInfo;
        this.commodityCoverPicUrl = commodityCoverPicUrl;
        this.commodityPicUrls = commodityPicUrls;
        this.onShelves = onShelves;
        this.inventory = inventory;
        this.remaining = remaining;
    }

    public CommodityDTO(Commodity commodity) {
        this.key = commodity.getCommodityId();
        this.price = commodity.getPrice();
        this.commodityInfo = commodity.getCommodityInfo();
        this.commodityCoverPicUrl = commodity.getCommodityCoverPicUrl();
        this.commodityPicUrls = commodity.getCommodityPicUrls();
        this.onShelves = commodity.getOnShelves();
        this.inventory = commodity.getInventory();
        this.remaining = commodity.getRemaining();
    }

    public Long getKey() {
        return key;
    }

    public void setKey(Long key) {
        this.key = key;
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

    public String getCommodityCoverPicUrl() {
        return commodityCoverPicUrl;
    }

    public void setCommodityCoverPicUrl(String commodityCoverPicUrl) {
        this.commodityCoverPicUrl = commodityCoverPicUrl;
    }

    public List<String> getCommodityPicUrls() {
        return commodityPicUrls;
    }

    public void setCommodityPicUrls(List<String> commodityPicUrls) {
        this.commodityPicUrls = commodityPicUrls;
    }

    public boolean isOnShelves() {
        return onShelves;
    }

    public void setOnShelves(boolean onShelves) {
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
