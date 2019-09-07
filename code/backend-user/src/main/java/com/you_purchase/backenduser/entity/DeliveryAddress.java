package com.you_purchase.backenduser.entity;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.*;

/**
 * 用户的收货地址
 *
 * @author Chuyuxuan
 */
@Entity
public class DeliveryAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long deliveryAddressId;

    @JoinColumn(name = "user_id")
    private Long userId;

    private String name;

    //1表示先生；2表示女士
    private Integer gender;

    private String contact;

    private String address;

    private double latitude;

    private double longitude;

    private String detailAddress;

    // 1表示家，2表示公司，3表示学校
    private Integer tag;

    public DeliveryAddress() {
    }

    public DeliveryAddress(String name, Integer gender, String contact, String address, double latitude, double longitude, String detailAddress, Integer tag) {
        this.name = name;
        this.gender = gender;
        this.contact = contact;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.detailAddress = detailAddress;
        this.tag = tag;
    }

    public Long getDeliveryAddressId() {
        return deliveryAddressId;
    }

    public void setDeliveryAddressId(Long deliveryAddressId) {
        this.deliveryAddressId = deliveryAddressId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getDetailAddress() {
        return detailAddress;
    }

    public void setDetailAddress(String detailAddress) {
        this.detailAddress = detailAddress;
    }

    public Integer getTag() {
        return tag;
    }

    public void setTag(Integer tag) {
        this.tag = tag;
    }
}
