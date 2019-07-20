package com.sjtu.adminanddealer.entity;


import com.sjtu.adminanddealer.parameter.UserModifyParameter;
import com.sjtu.adminanddealer.parameter.UserRegParameter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class User {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    private String userName;

    private String password;

    private String phone;

    private String address;

    private double latitude;

    private double longitude;

    private String photo;
    //用户是否可用
    private boolean valid;

    private String regDate;

    private String gender;


    public void setReg(UserRegParameter userRegParameter) {
        this.setPhone(userRegParameter.getPhone());
        this.setRegDate(userRegParameter.getRegDate());
    }

    public void setInfo(UserModifyParameter userModifyParameter) {
        this.setAddress(userModifyParameter.getAddress());
        this.setGender(userModifyParameter.getGender());
        this.setLatitude(userModifyParameter.getLatitude());
        this.setLongitude(userModifyParameter.getLongitude());
        this.setPassword(userModifyParameter.getPassword());
        this.setUserName(userModifyParameter.getUserName());
        this.setPhone(userModifyParameter.getPhone());
        this.setValid(true);
    }

    public boolean pwdConfirm(String pwd) {
        if (pwd.equals(this.password))
            return true;
        else
            return false;
    }


    //getter and setter


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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
