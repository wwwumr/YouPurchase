package com.sjtu.adminanddealer.parameter;

import lombok.Data;

import java.util.Date;

/**
 * 前端发送新建或修改一个经销商的数据格式
 *
 * @author Chuyuxuan
 */
@Data
public class DealerParameter {
    private Long key;

    private String userName;

    private Integer gender;

    private Date birthday;

    private String realName;

    private String contact;

    private Long storeId;

    private String password;

    /* constructor */
    public DealerParameter() {
    }

    public DealerParameter(Long key, String userName, Integer gender, Date birthday, String realName, String contact, Long storeId, String password) {
        this.key = key;
        this.userName = userName;
        this.gender = gender;
        this.birthday = birthday;
        this.realName = realName;
        this.contact = contact;
        this.storeId = storeId;
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

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
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
        return this.storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
