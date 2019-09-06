package com.you_purchase.backenduser.entity;


import javax.persistence.*;

@Entity
public class Recommend {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recommendId")
    private long recommendId;

    private double price;

    private long classInfo;


    public void setRec(double price,long classInfo){
        this.setClassInfo(classInfo);
        this.setPrice(price);
    }




    //getter and setter
    public long getRecommendId() {
        return recommendId;
    }

    public void setRecommendId(long recommendId) {
        this.recommendId = recommendId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public long getClassInfo() {
        return classInfo;
    }

    public void setClassInfo(long classInfo) {
        this.classInfo = classInfo;
    }
}
