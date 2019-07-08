package com.sjtu.adminanddealer.parameter;


import com.sjtu.adminanddealer.entity.OrderItem;

import java.util.Date;
import java.util.List;

//用户下订单
public class OrderPostParameter {
    private long userId;

    private String userName;

    private String storeName;

    private Date createTime;

    private List<OrderItem> OrderItemList;

    private double totalPrice;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public List<OrderItem> getOrderItemList() {
        return OrderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        OrderItemList = orderItemList;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
