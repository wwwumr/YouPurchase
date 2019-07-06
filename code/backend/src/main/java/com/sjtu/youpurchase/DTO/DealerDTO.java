package com.sjtu.youpurchase.DTO;

/**
 * 返回前端的经销商数据格式
 *
 * @author Chuyuxuan
 */
public class DealerDTO {

    private Long key;

    private String userName;

    private String avatar;

    private String address;

    private String realName;

    private String contact;

    private String storeName;

    private String password;

    /* constructor */
    public DealerDTO() {
    }

    public DealerDTO(Long key, String userName, String avatar, String address, String realName, String contact, String storeName, String password) {
        this.key = key;
        this.userName = userName;
        this.avatar = avatar;
        this.address = address;
        this.realName = realName;
        this.contact = contact;
        this.storeName = storeName;
        this.password = password;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
