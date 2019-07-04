package com.sjtu.youpurchase.entity;

import com.sjtu.youpurchase.parameter.UserRegisterParameter;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * 用户类对应的实体类
 *
 * @author Chuyuxuan
 */
@Entity
public class User {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
<<<<<<< HEAD

    private long userId;
=======
    @Column(name = "userId")
    private Long userId;
>>>>>>> a1d13f20e3229080d729a538bc8bdfa229821703

    @Column(nullable = false, unique = true, length = 30)
    private String userName;

    @Column(nullable = false, length = 30)
    private String password;

    //地址
    @Column(length=30,nullable = false)
    private String address;

    //经度
    private double longitude;

    //纬度
    private double latitude;

    @Column(length=11)
    private String phone;

    //头像路径
    @Column(length=256)
    private String photo;

    //注册日期
    private String regDate;

    //状态
    private boolean valid;

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

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }


    public void setInfo(UserRegisterParameter userRegisterParameter){
        this.setUserName(userRegisterParameter.getUserName());
        this.setPassword(userRegisterParameter.getPassword());
        this.setAddress(userRegisterParameter.getAddress());
        this.setPhone(userRegisterParameter.getPhone());
        this.setLatitude(userRegisterParameter.getLatitude());
        this.setLongitude(userRegisterParameter.getLongitude());
        this.setRegDate(userRegisterParameter.getRegDate());
        this.setPhoto("");
        this.setValid(true);
    }
}
