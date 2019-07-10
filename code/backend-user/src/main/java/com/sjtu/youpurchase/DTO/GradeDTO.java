package com.sjtu.youpurchase.DTO;

import com.sjtu.youpurchase.entity.Grade;

public class GradeDTO {
    private long gradeId;

    private long userId;

    private long storeId;

    private String userName;

    private String storeName;

    private String context;

    private double score;

    private String gradeTime;


    public GradeDTO(Grade grade){
        if(grade != null){
            this.setGradeId(grade.getGradeId());
            this.setContext(grade.getContext());
            this.setUserName(grade.getUserName());
            this.setStoreName(grade.getStoreName());
            this.setGradeTime(grade.getGradeTime());
            this.setScore(grade.getScore());
            this.setStoreId(grade.getStoreId());
            this.setUserId(grade.getUserId());
        }
    }

    //getter and setter

    public String getGradeTime() {
        return gradeTime;
    }

    public void setGradeTime(String gradeTime) {
        this.gradeTime = gradeTime;
    }

    public long getGradeId() {
        return gradeId;
    }

    public void setGradeId(long gradeId) {
        this.gradeId = gradeId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getStoreId() {
        return storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
