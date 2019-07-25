package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;

import java.text.SimpleDateFormat;
import java.util.Date;


@ApiModel(description = "用户实体")
public class UserInfoDTO {
    private long userId;

    private String userName;

    private double longitude;

    private double latitude;

    private String address;

    private String phone;

    private String photo;

    private String regDate;

    private String gender;


    public UserInfoDTO(User user){
        if(user != null){
            this.setUserId(user.getUserId());
            this.setAddress(user.getAddress());
            this.setLatitude(user.getLatitude());
            this.setLongitude(user.getLongitude());
            this.setPhone(user.getPhone());
            this.setUserName(user.getUserName());
            this.setPhoto(user.getPhoto());
            Date sDate = user.getRegDate();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String  date = formatter.format(sDate);
            this.setRegDate(date);
            this.setGender(user.getGender());
        }
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
