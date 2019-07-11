package com.sjtu.youpurchase.DTO;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

import com.sjtu.youpurchase.entity.OrderInfo;
import com.sjtu.youpurchase.entity.OrderItem;


/*
* 用户查看订单
* */

public class OrderCheckDTO {
    private long userId;

    private String storeName;

    private String status;

    private List<OrderItem> orderItemList;

    private Date createTime;

    private double totalPrice;

    private boolean valid;

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
