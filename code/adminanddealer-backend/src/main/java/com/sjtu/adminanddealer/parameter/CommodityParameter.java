package com.sjtu.adminanddealer.parameter;

/**
 * 从前端接受的商品信息格式.
 *
 * @author Chuyuxuan
 */
public class CommodityParameter {

    private Long key;

    private double price;

    private String commodityInfo;

    private boolean onShelves;

    private Integer inventory;

    private Integer remaining;

    private String commodityClass;

    public CommodityParameter() {
    }

    public CommodityParameter(Long key, double price, String commodityInfo, boolean onShelves, Integer inventory, Integer remaining) {
        this.key = key;
        this.price = price;
        this.commodityInfo = commodityInfo;
        this.onShelves = onShelves;
        this.inventory = inventory;
        this.remaining = remaining;
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

    public String getCommodityClass() {
        return commodityClass;
    }

    public void setCommodityClass(String commodityClass) {
        this.commodityClass = commodityClass;
    }
}
