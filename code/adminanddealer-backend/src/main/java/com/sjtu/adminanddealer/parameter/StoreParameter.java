package com.sjtu.adminanddealer.parameter;

import lombok.Data;

/**
 * 从前端接受的新建店铺的信息
 */
@Data
public class StoreParameter {
    private Long key;

    private String storeName;

    private String address;

    private String contact;

    private String[] hours;

    private Long dealerId;

    /* constructor */
    public StoreParameter() {
    }

    public StoreParameter(Long key, String storeName, String address,
                          String contact, String[] hours, Long dealerId) {
        this.key = key;
        this.storeName = storeName;
        this.address = address;
        this.contact = contact;
        this.hours = hours;
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

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String[] getHours() {
        return hours;
    }

    public void setHours(String[] hours) {
        this.hours = hours;
    }

    public Long getDealerId() {
        return dealerId;
    }

    public void setDealerId(Long dealerId) {
        this.dealerId = dealerId;
    }
}
