package com.you_purchase.backenduser.entity;


import com.you_purchase.backenduser.parameter.UserModifyParameter;
import com.you_purchase.backenduser.parameter.UserRegParameter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

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

    private Date regDate;

    private String gender;

    private long recommendId;

    public void setInfo(UserModifyParameter userModifyParameter){
        this.setAddress(userModifyParameter.getAddress());
        this.setGender(userModifyParameter.getGender());
        this.setLatitude(userModifyParameter.getLatitude());
        this.setLongitude(userModifyParameter.getLongitude());
        this.setUserName(userModifyParameter.getUserName());
        this.setValid(true);
    }

    public boolean pwdConfirm(String pwd){
        if(pwd.equals(this.password))
            return true;
        else
            return false;
    }





    //getter and setter


    public long getRecommendId() {
        return recommendId;
    }

    public void setRecommendId(long recommendId) {
        this.recommendId = recommendId;
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

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
