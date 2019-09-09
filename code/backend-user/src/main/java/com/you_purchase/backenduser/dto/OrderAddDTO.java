package com.you_purchase.backenduser.dto;

import java.util.ArrayList;

public class OrderAddDTO {
    private double totalPrice;

    private ArrayList fails;

    private long orderInfoId;

    public OrderAddDTO(double price ,ArrayList fails,long orderInfoId){
        this.setFails(fails);
        this.setTotalPrice(price);
        this.setOrderInfoId(orderInfoId);
    }




    //getter and setter
    public long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(long orderInfoId) {
        this.orderInfoId = orderInfoId;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ArrayList getFails() {
        return fails;
    }

    public void setFails(ArrayList fails) {
        this.fails = fails;
    }
}
