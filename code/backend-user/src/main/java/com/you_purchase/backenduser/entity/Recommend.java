package com.you_purchase.backenduser.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Recommend {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long recId;

    private double recPrice;

    private int  recType;



    //getter and setter
    public long getRecId() {
        return recId;
    }

    public void setRecId(long recId) {
        this.recId = recId;
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
