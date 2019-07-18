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

    private String tarPeople;

    private String tarAddress;

    private String tarPhone;

    private List<OrderItem> orderItemList;




    //getter and setter

    public String getTarPeople() {
        return tarPeople;
    }

    public void setTarPeople(String tarPeople) {
        this.tarPeople = tarPeople;
    }

    public String getTarAddress() {
        return tarAddress;
    }

    public void setTarAddress(String tarAddress) {
        this.tarAddress = tarAddress;
    }

    public String getTarPhone() {
        return tarPhone;
    }

    public void setTarPhone(String tarPhone) {
        this.tarPhone = tarPhone;
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
