package com.sjtu.youpurchase.entity;


import com.sjtu.youpurchase.parameter.GradeParameter;
import lombok.Data;

import javax.persistence.*;
import javax.print.attribute.standard.DateTimeAtCompleted;
import javax.validation.constraints.NotNull;
import java.util.Date;

/*
 * 用户评论对应实体类
 * */
@Entity
@Data
public class Grade {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long gradeId;

    private String userName;

    private String storeName;

    private long userId;

    private long storeId;

    @Column(length = 256)
    private String context;

    @Column(length = 1)
    //0-10
    private double score;

    private String gradeTime;

    //是否可用
    private boolean valid;

    public void setInfo(GradeParameter gradeParameter){
        this.setContext(gradeParameter.getContext());
        this.setScore(gradeParameter.getScore());
        this.setValid(true);
        this.setStoreName(gradeParameter.getStoreName());
        this.setUserName(gradeParameter.getUserName());
        this.setUserId(gradeParameter.getUserId());
        this.setStoreId(gradeParameter.getStoreId());
        this.setGradeTime(gradeParameter.getGradeTime());
    }


    //getter and setter

    public String getGradeTime() {
        return gradeTime;
    }

    public void setGradeTime(String gradeTime) {
        this.gradeTime = gradeTime;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public long getGradeId() {
        return gradeId;
    }

    public void setGradeId(long gradeId) {
        this.gradeId = gradeId;
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
