package com.you_purchase.backenduser.dto;

import java.util.ArrayList;

public class OrderAddDTO {
    private double totalPrice;

    private ArrayList fails;


    public OrderAddDTO(double price ,ArrayList fails){
        this.setFails(fails);
        this.setTotalPrice(price);
    }




    //getter and setter


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
