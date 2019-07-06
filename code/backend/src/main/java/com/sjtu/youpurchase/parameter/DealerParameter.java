package com.sjtu.youpurchase.parameter;

import lombok.Data;

/**
 * 前端发送新建或修改一个经销商的数据格式
 *
 * @author Chuyuxuan
 */
@Data
public class DealerParameter {
    private Long key;

    private String userName;

    private String address;

    private String realName;

    private String contact;

    private String password;

    /* constructor */
    public DealerParameter() {
    }

    public DealerParameter(Long key, String userName, String address, String realName, String contact, String password) {
        this.key = key;
        this.userName = userName;
        this.address = address;
        this.realName = realName;
        this.contact = contact;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
