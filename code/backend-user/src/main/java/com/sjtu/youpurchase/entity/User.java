package com.sjtu.youpurchase.entity;

import com.sjtu.youpurchase.parameter.UserModifyParameter;
import com.sjtu.youpurchase.parameter.UserRegParameter;

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

    private long userId;

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

    private String gender;
    //状态
    private boolean valid;


    //用户主动修改个人信息,不包括头像，注册日期
    public void setInfo(UserModifyParameter userModifyParameter){
        this.setUserName(userModifyParameter.getUserName());
        this.setPassword(userModifyParameter.getPassword());
        this.setAddress(userModifyParameter.getAddress());
        this.setPhone(userModifyParameter.getPhone());
        this.setLatitude(userModifyParameter.getLatitude());
        this.setLongitude(userModifyParameter.getLongitude());
        this.setGender(userModifyParameter.getGender());
    }

    //短信验证修改基本信息——电话，注册日期
    public void setRegInfo(UserRegParameter userRegParameter){
        this.setPhone(userRegParameter.getPhone());
        this.setRegDate(userRegParameter.getRegDate());
    }

    public boolean pwdConfirm(String pwd){
        if(pwd.equals(this.password))
            return true;
        else
            return false;
    }



    //getter and setter


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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



}
