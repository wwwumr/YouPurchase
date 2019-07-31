package com.you_purchase.backenduser.dto;

public class OrderCheckDTO {

    private String commodityCoverPicUrl;

    private String commodityInfo;

    private double price;

    private long commodityId;

    private int amount;

    public String getCommodityCoverPicUrl() {
        return commodityCoverPicUrl;
    }

    public void setCommodityCoverPicUrl(String commodityCoverPicUrl) {
        this.commodityCoverPicUrl = commodityCoverPicUrl;
    }

    public String getCommodityInfo() {
        return commodityInfo;
    }

    public void setCommodityInfo(String commodityInfo) {
        this.commodityInfo = commodityInfo;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public long getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(long commodityId) {
        this.commodityId = commodityId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
