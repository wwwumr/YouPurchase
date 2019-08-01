package com.sjtu.adminanddealer.parameter;

import lombok.Data;

/**
 * 从前端接受的新建店铺的信息
 */
@Data
public class StoreParameter {
    private Long key;

    private String storeName;

    private String contact;

    private String startHour;

    private String endHour;

    private Integer deliveryType;

    private double deliveryRange;

    private Long dealerId;

    /* constructor */
    public StoreParameter() {
    }

    public StoreParameter(Long key, String storeName, String contact, String startHour, String endHour, Integer deliveryType, double deliveryRange, Long dealerId) {
        this.key = key;
        this.storeName = storeName;
        this.contact = contact;
        this.startHour = startHour;
        this.endHour = endHour;
        this.deliveryType = deliveryType;
        this.deliveryRange = deliveryRange;
        this.dealerId = dealerId;
    }

    /* getter and setter */
    public Long getKey() {
        return key;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getStartHour() {
        return startHour;
    }

    public void setStartHour(String startHour) {
        this.startHour = startHour;
    }

    public String getEndHour() {
        return endHour;
    }

    public void setEndHour(String endHour) {
        this.endHour = endHour;
    }

    public Integer getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(Integer deliveryType) {
        this.deliveryType = deliveryType;
    }

    public double getDeliveryRange() {
        return deliveryRange;
    }

    public void setDeliveryRange(double deliveryRange) {
        this.deliveryRange = deliveryRange;
    }

    public Long getDealerId() {
        return dealerId;
    }

    public void setDealerId(Long dealerId) {
        this.dealerId = dealerId;
    }
}
