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

    private String tarPeople;

    private double totalPrice;

    private String createDate;

    private boolean judged;

    List<OrderItem> orderItemList;






    //getter and setter

    public String getTarPeople() {
        return tarPeople;
    }

    public void setTarPeople(String tarPeople) {
        this.tarPeople = tarPeople;
    }

    public boolean isJudged() {
        return judged;
    }

    public void setJudged(boolean judged) {
        this.judged = judged;
    }

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
