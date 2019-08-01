package com.sjtu.adminanddealer.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 店铺对应的实体类.
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "storeId")
    private Long storeId;

    @Column(nullable = false, length = 31)
    private String storeName;

    private String coverPicUrl;

    private String address;

    // 经度
    private double longitude;

    // 纬度
    private double latitude;

    @Column(nullable = false)
    private String contact;

    private Date openHourStart;

    private Date openHourEnd;

    // 表示店铺是否有经销商管理
    private boolean attached;

    // 店铺的配送方式：0表示自己配送，1表示使用外部配送（蜂鸟）
    private Integer deliveryType;

    // 店铺的配送范围，用double表示，单位为km
    private double deliveryRange;

    @OneToOne
    @JsonIgnoreProperties(value = {"store"})
    @JoinColumn(name = "dealerId")
    private Dealer dealer;

    @OneToMany(targetEntity = Commodity.class)
    @JoinTable(name = "storeCommodity", joinColumns = {@JoinColumn(name = "storeId", referencedColumnName = "storeId")},
            inverseJoinColumns = {@JoinColumn(name = "commodityId", referencedColumnName = "commodityId")})
    private List<Commodity> commodityList;

    /* constructor */
    public Store() {
    }

    public Store(String storeName, String coverPicUrl, String address, double longitude, double latitude, String contact, Date openHourStart, Date openHourEnd, boolean attached, Integer deliveryType, double deliveryRange, Dealer dealer, List<Commodity> commodityList) {
        this.storeName = storeName;
        this.coverPicUrl = coverPicUrl;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.contact = contact;
        this.openHourStart = openHourStart;
        this.openHourEnd = openHourEnd;
        this.attached = attached;
        this.deliveryType = deliveryType;
        this.deliveryRange = deliveryRange;
        this.dealer = dealer;
        this.commodityList = commodityList;
    }

    /* getter and setter */
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

    public Dealer getDealer() {
        return dealer;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    public List<Commodity> getCommodityList() {
        return commodityList;
    }

    public void setCommodityList(List<Commodity> commodityList) {
        this.commodityList = commodityList;
    }

    // 这里override toString()方法是因为在有些时候调用时，防止出现无限递归的情况
    @Override
    public String toString() {
        if (this.getDealer() != null) {
            return "Store{" +
                    "storeId=" + storeId +
                    ", storeName='" + storeName + '\'' +
                    ", coverPicUrl='" + coverPicUrl + '\'' +
                    ", address='" + address + '\'' +
                    ", longitude=" + longitude +
                    ", latitude=" + latitude +
                    ", contact='" + contact + '\'' +
                    ", openHourStart=" + openHourStart +
                    ", openHourEnd=" + openHourEnd +
                    ", attached=" + attached +
                    ", deliveryType=" + deliveryType +
                    ", deliveryRange=" + deliveryRange +
                    ", dealer=" + dealer +
                    ", commodityList=" + commodityList +
                    '}';
        } else {
            return "Store{" +
                    "storeId=" + storeId +
                    ", storeName='" + storeName + '\'' +
                    ", coverPicUrl='" + coverPicUrl + '\'' +
                    ", address='" + address + '\'' +
                    ", longitude=" + longitude +
                    ", latitude=" + latitude +
                    ", contact='" + contact + '\'' +
                    ", openHourStart=" + openHourStart +
                    ", openHourEnd=" + openHourEnd +
                    ", attached=" + attached +
                    ", deliveryType=" + deliveryType +
                    ", deliveryRange=" + deliveryRange +
                    ", dealer=null" +
                    ", commodityList=" + commodityList +
                    '}';
        }

    }

}
