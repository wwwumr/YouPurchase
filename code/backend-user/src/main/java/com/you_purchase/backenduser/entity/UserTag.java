package com.you_purchase.backenduser.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class UserTag {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userTagId;

    private double recPrice;

    private int recType;

    //getter and setter

    public long getUserTagId() {
        return userTagId;
    }

    public void setUserTagId(long userTagId) {
        this.userTagId = userTagId;
    }

    public double getRecPrice() {
        return recPrice;
    }

    public void setRecPrice(double recPrice) {
        this.recPrice = recPrice;
    }

    public int getRecType() {
        return recType;
    }

    public void setRecType(int recType) {
        this.recType = recType;
    }
}
