package com.you_purchase.backenduser.entity;

import com.you_purchase.backenduser.parameter.OrderParameter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class OrderInfo {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long orderInfoId;

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
    //执行状态，0：待处理 1：待配送 2：已发货 3：已完成
    private int status;
    //订单可用
    private boolean valid;

    public void setOrderInfo(OrderParameter orderParameter){
        this.setAmount(orderParameter.getAmount());
        this.setCreateDate(orderParameter.getCreateDate());
        this.setOrderItemId(orderParameter.getOrderItemId());
        this.setOrderIteName(orderParameter.getOrderIteName());
        this.setPrice(orderParameter.getPrice());
        this.setStoreId(orderParameter.getStoreId());
        this.setStoreName(orderParameter.getStoreName());
        this.setTotalPrice(orderParameter.getTotalPrice());
        this.setUserId(orderParameter.getUserId());
        this.setUserName(orderParameter.getUserName());
        this.setValid(true);
        this.setStatus(0);
    }




    //getter and setter


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(long orderInfoId) {
        this.orderInfoId = orderInfoId;
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

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
