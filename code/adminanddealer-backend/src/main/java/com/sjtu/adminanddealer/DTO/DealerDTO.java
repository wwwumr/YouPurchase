package com.sjtu.adminanddealer.DTO;

import com.sjtu.adminanddealer.entity.Dealer;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 返回前端的经销商数据格式
 *
 * @author Chuyuxuan
 */
public class DealerDTO {

    private Long key;

    private String userName;

    private String avatar;

    private Integer gender;

    private String birthday;

    private String realName;

    private String contact;

    private Long storeId;

    private String storeName;


    /* constructor */
    public DealerDTO() {
    }

    public DealerDTO(Long key, String userName, String avatar, Integer gender, String birthday, String realName, String contact, Long storeId, String storeName) {
        this.key = key;
        this.userName = userName;
        this.avatar = avatar;
        this.gender = gender;
        this.birthday = birthday;
        this.realName = realName;
        this.contact = contact;
        this.storeId = storeId;
        this.storeName = storeName;
    }

    public DealerDTO(Dealer dealer) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        this.key = dealer.getDealerId();
        this.userName = dealer.getUserName();
        this.avatar = dealer.getAvatar();
        this.gender = dealer.getGender();
        this.birthday = formatter.format(dealer.getBirthday());
        this.realName = dealer.getRealName();
        this.contact = dealer.getContact();
        if (dealer.getStore() != null) {
            this.storeId = dealer.getStore().getStoreId();
            this.storeName = dealer.getStore().getStoreName();
        }
    }

    @Override
    public String toString() {
        return "DealerDTO{" +
                "key=" + key +
                ", userName='" + userName + '\'' +
                ", avatar='" + avatar + '\'' +
                ", gender=" + gender +
                ", birthday=" + birthday +
                ", realName='" + realName + '\'' +
                ", contact='" + contact + '\'' +
                ", storeId=" + storeId +
                ", storeName='" + storeName + '\'' +
                '}';
    }

    /* getter and setter */
    public Long getKey() {
        return key;
    }

    public void setKey(Long key) {
        this.key = key;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

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

}
