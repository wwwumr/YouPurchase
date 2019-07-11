package com.you_purchase.backenduser.dto;

public class OrderCheckDTO {
    private long orderInfoId;

    private String userName;

    private String storeName;

    private String orderIteName;

    private int amount;

    private double price;

    private double totalPrice;

    private String createDate;

    private int status;


    //getter and setter

    public long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(long orderInfoId) {
        this.orderInfoId = orderInfoId;
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

    public String getOrderIteName() {
        return orderIteName;
    }

    public void setOrderIteName(String orderIteName) {
        this.orderIteName = orderIteName;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
