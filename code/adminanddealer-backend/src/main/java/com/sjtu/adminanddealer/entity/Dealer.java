package com.sjtu.adminanddealer.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * 经销商对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Dealer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "dealerId")
    private Long dealerId;

    @Column(nullable = false, length = 31)
    private String userName;

    @Column(nullable = false, length = 128)
    private String password;

    private Integer gender;

    private Date birthday;

    @Column(nullable = false, length = 31)
    private String realName;

    @Column(nullable = false, length = 31)
    private String contact;

    // 经销商头像url
    private String avatar;

    private boolean attached;

    @OneToOne
    @JsonIgnoreProperties(value = {"dealer"})
    @JoinColumn(name = "storeId")
    private Store store;

    /* constructor */
    public Dealer() {
    }

    public Dealer(String userName, String password, Integer gender, Date birthday, String realName, String contact, String avatar, boolean attached, Store store) {
        this.userName = userName;
        this.password = password;
        this.gender = gender;
        this.birthday = birthday;
        this.realName = realName;
        this.contact = contact;
        this.avatar = avatar;
        this.attached = attached;
        this.store = store;
    }

    /* getter and setter */
    public Long getDealerId() {
        return dealerId;
    }

    public void setDealerId(Long dealerId) {
        this.dealerId = dealerId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public boolean isAttached() {
        return attached;
    }

    public void setAttached(boolean attached) {
        this.attached = attached;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    // 这里override toString()方法是因为在有些时候调用时，防止出现无限递归的情况
    @Override
    public String toString() {
        if (this.getStore() != null) {
            return "Dealer{" +
                    "dealerId=" + dealerId +
                    ", userName='" + userName + '\'' +
                    ", password='" + password + '\'' +
                    ", gender=" + gender +
                    ", birthday=" + birthday +
                    ", realName='" + realName + '\'' +
                    ", contact='" + contact + '\'' +
                    ", avatar='" + avatar + '\'' +
                    ", attached=" + attached +
                    ", store=" + store.getStoreId() +
                    '}';
        } else {
            return "Dealer{" +
                    "dealerId=" + dealerId +
                    ", userName='" + userName + '\'' +
                    ", password='" + password + '\'' +
                    ", gender=" + gender +
                    ", birthday=" + birthday +
                    ", realName='" + realName + '\'' +
                    ", contact='" + contact + '\'' +
                    ", avatar='" + avatar + '\'' +
                    ", attached=" + attached +
                    ", store=null" +
                    '}';
        }
    }

}
