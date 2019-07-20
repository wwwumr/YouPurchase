package com.sjtu.adminanddealer.parameter;



/*
 * 用户注册申请
 * */

public class UserRegParameter {
    private String phone;

    private String regDate;

    private String certification;

    //getter and setter

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getCertification() {
        return certification;
    }

    public void setCertification(String certification) {
        this.certification = certification;
    }
}
