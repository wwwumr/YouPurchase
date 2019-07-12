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

    @Column(nullable = false)
    private String address;

    private double longitude;

    private double latitude;

    @Column(nullable = false)
    private String contact;

    private Date openHourStart;

    private Date openHourEnd;

    private boolean attached;

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

    public Store(String storeName, String coverPicUrl, String address, double longitude, double latitude, String contact, Date openHourStart, Date openHourEnd, boolean attached, Dealer dealer, List<Commodity> commodityList) {
        this.storeName = storeName;
        this.coverPicUrl = coverPicUrl;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.contact = contact;
        this.openHourStart = openHourStart;
        this.openHourEnd = openHourEnd;
        this.attached = attached;
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
                    ", dealer=" + dealer.getDealerId() +
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
                    ", dealer=null" +
                    ", commodityList=" + commodityList +
                    '}';
        }

    }

}
