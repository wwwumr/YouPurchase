package com.sjtu.youpurchase.DTO;

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
    private String[] hours;

    private Integer dealerId;

    private String dealerName;

    /* constructor */
    public StoreDTO() {
    }

    public StoreDTO(Long key, String storeName, String address, String coverPicUrl, String contact, String[] hours, Integer dealerId, String dealerName) {
        this.key = key;
        this.storeName = storeName;
        this.address = address;
        this.coverPicUrl = coverPicUrl;
        this.contact = contact;
        this.hours = hours;
        this.dealerId = dealerId;
        this.dealerName = dealerName;
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

    public String[] getHours() {
        return hours;
    }

    public void setHours(String[] hours) {
        this.hours = hours;
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

}
