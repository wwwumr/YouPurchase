package com.sjtu.adminanddealer.DTO;

import com.sjtu.adminanddealer.entity.Store;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * 前端需要的商店信息格式
 *
 * @author Chuyuxuan
 */
public class StoreDTO {

    private Long key;

    private String storeName;

    private String address;

    private String coverPicUrl;

    private String contact;

    /*总共有两个元素,hour[0]营业开始时间,hours[1]结束时间,格式均为HH:mm*/
    private String startHour;

    private String endHour;

    private Integer dealerId;

    private String dealerName;

    private Integer deliveryType;

    private double deliveryRange;

    /* constructor */
    public StoreDTO() {
    }

    public StoreDTO(Long key, String storeName, String address, String coverPicUrl, String contact, String startHour, String endHour, Integer dealerId, String dealerName, Integer deliveryType, double deliveryRange) {
        this.key = key;
        this.storeName = storeName;
        this.address = address;
        this.coverPicUrl = coverPicUrl;
        this.contact = contact;
        this.startHour = startHour;
        this.endHour = endHour;
        this.dealerId = dealerId;
        this.dealerName = dealerName;
        this.deliveryType = deliveryType;
        this.deliveryRange = deliveryRange;
    }

    public StoreDTO(Store store) {
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");
        this.key = store.getStoreId();
        this.storeName = store.getStoreName();
        this.address = store.getAddress();
        this.coverPicUrl = store.getCoverPicUrl();
        this.contact = store.getContact();
        this.startHour = dateFormat.format(store.getOpenHourStart());
        this.endHour = dateFormat.format(store.getOpenHourEnd());
        if (store.getDealer() != null) {
            this.dealerId = store.getDealer().getDealerId().intValue();
            this.dealerName = store.getDealer().getUserName();
        }
        this.deliveryType = store.getDeliveryType();
        this.deliveryRange = store.getDeliveryRange();
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

    public String getCoverPicUrl() {
        return coverPicUrl;
    }

    public void setCoverPicUrl(String coverPicUrl) {
        this.coverPicUrl = coverPicUrl;
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

    public Integer getDealerId() {
        return dealerId;
    }

    public void setDealerId(Integer dealerId) {
        this.dealerId = dealerId;
    }

    public String getDealerName() {
        return dealerName;
    }

    public void setDealerName(String dealerName) {
        this.dealerName = dealerName;
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
}
