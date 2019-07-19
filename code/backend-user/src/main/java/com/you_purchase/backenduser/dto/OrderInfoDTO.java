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

    private  String tarPhone;

    private String  tarAddress;

    private double totalPrice;

    private String createDate;

    private boolean judged;

    List<OrderListDTO> orderItemList;






    //getter and setter
    public List<OrderListDTO> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderListDTO> orderItemList) {
        this.orderItemList = orderItemList;
    }

    public String getTarPhone() {
        return tarPhone;
    }

    public void setTarPhone(String tarPhone) {
        this.tarPhone = tarPhone;
    }

    public String getTarAddress() {
        return tarAddress;
    }

    public void setTarAddress(String tarAddress) {
        this.tarAddress = tarAddress;
    }

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
