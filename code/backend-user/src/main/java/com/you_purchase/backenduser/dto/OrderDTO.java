package com.you_purchase.backenduser.dto;

import java.util.ArrayList;

public class OrderDTO {
    private double price;

    private ArrayList ids;


    public OrderDTO(double price,ArrayList ids){
        this.setIds(ids);
        this.setPrice(price);
    }
    //getter and setter

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ArrayList getIds() {
        return ids;
    }

    public void setIds(ArrayList ids) {
        this.ids = ids;
    }
}
