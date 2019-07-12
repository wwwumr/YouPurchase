package com.you_purchase.backenduser.entity;


import com.you_purchase.backenduser.parameter.GradeParameter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Grade {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long gradeId;

    private long userId;

    private long storeId;

    private double score;

    private String content;

    private String createDate;

    private boolean valid;

    public void setInfo(GradeParameter gradeParameter){
        this.setContent(gradeParameter.getContent());
        this.setScore(gradeParameter.getScore());
        this.setStoreId(gradeParameter.getStoreId());
        this.setUserId(gradeParameter.getUserId());
        this.setCreateDate(gradeParameter.getCreateDate());
        this.setValid(true);
    }




    //getter and setter

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
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

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
