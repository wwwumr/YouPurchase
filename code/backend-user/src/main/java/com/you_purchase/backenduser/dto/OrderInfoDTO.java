package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.entity.OrderInfo;

public class OrderInfoDTO {
    private long userId;

    private long storeId;

    private long orderItemId;

    private String userName;

    private String storeName;

    private String orderIteName;

    private int amount;

    private double price;

    private double totalPrice;

    private String createDate;

    private int status;

    public OrderInfoDTO(OrderInfo orderInfo){
        if(orderInfo != null){
            this.setAmount(orderInfo.getAmount());
            this.setCreateDate(orderInfo.getCreateDate());
            this.setOrderItemId(orderInfo.getOrderItemId());
            this.setOrderIteName(orderInfo.getOrderIteName());
            this.setPrice(orderInfo.getPrice());
            this.setStoreId(orderInfo.getStoreId());
            this.setStoreName(orderInfo.getStoreName());
            this.setTotalPrice(orderInfo.getTotalPrice());
            this.setStatus(orderInfo.getStatus());
            this.setUserId(orderInfo.getUserId());
            this.setUserName(orderInfo.getUserName());
        }
    }


    //getter and setter


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
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

    public long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(long orderItemId) {
        this.orderItemId = orderItemId;
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
}
