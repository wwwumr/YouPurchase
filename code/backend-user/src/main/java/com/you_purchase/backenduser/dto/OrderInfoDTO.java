package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.dao.OrderInfoDao;
import com.you_purchase.backenduser.dao.UserDao;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.OrderItem;
import com.you_purchase.backenduser.entity.User;

import java.util.List;

public class OrderInfoDTO {
    private long orderInfoId;

    private String storeName;

    private String userName;

    private double totalPrice;

    private String createDate;

    List<OrderItem> orderItemList;








    //getter and setter


    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }

    public long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(long orderInfoId) {
        this.orderInfoId = orderInfoId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
