package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 店铺对应的实体类.
 *
 * @author Chuyuxuan
 */

@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "storeId")
    private Long storeId;

    @Column(nullable = false, length = 31)
    private String storeName;

    private String coverPicUrl;

    @Column(nullable = false)
    private String address;

    private double longitude;

    private double latitude;

    @Column(nullable = false)
    private String contact;

    private Date openHourStart;

    private Date openHourEnd;

    private boolean attached;

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getCoverPicUrl() {
        return coverPicUrl;
    }

    public void setCoverPicUrl(String coverPicUrl) {
        this.coverPicUrl = coverPicUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Date getOpenHourStart() {
        return openHourStart;
    }

    public void setOpenHourStart(Date openHourStart) {
        this.openHourStart = openHourStart;
    }

    public Date getOpenHourEnd() {
        return openHourEnd;
    }

    public void setOpenHourEnd(Date openHourEnd) {
        this.openHourEnd = openHourEnd;
    }

    public boolean isAttached() {
        return attached;
    }

    public void setAttached(boolean attached) {
        this.attached = attached;
    }
}
