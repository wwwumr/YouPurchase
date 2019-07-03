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
    @Column(name = "userId")
    private Long userId;

    @Column(nullable = false, unique = true, length = 30)
    private String userName;

    @Column(nullable = false, length = 30)
    private String password;

<<<<<<< HEAD
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

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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

    public void setSmsInfo(String phone,String regDate){
        this.setPhone(phone);
        this.setRegDate(regDate);
        this.setValid(true);
        this.setPhoto("");
        this.setPassword("");
        this.setLongitude(0.0);
        this.setLatitude(0.0);
        this.setUserName("");
        this.setAddress("");
    }


    //password验证
    public boolean pwdConfirm(String password){
        if(password.equals(this.password))
            return true;
=======
    //地区位置
    @Column(length = 30)
    private String area;

    //街道地址
    @Column(length = 30, nullable = false)
    private String address;

    @Column(length = 11)
    private String phone;

    @Column(length = 256)
    private String imgFile;
>>>>>>> a31261f74161f97e15d1a5b67183c904356fc9e0

        else
            return false;
    }
}
