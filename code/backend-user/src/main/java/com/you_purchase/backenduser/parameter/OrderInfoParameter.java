package com.you_purchase.backenduser.parameter;

import com.you_purchase.backenduser.entity.OrderItem;

import java.util.List;



/*
* 用户下订单传递的数据
* */

public class OrderInfoParameter {
    private long userId;

    private long storeId;

    private double totalPrice;

    private String createDate;

    private List<OrderItem> orderItemList;

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

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }




    //getter and setter
}
