package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.dao.OrderInfoDao;
import com.you_purchase.backenduser.dao.UserDao;
import com.you_purchase.backenduser.entity.Commodity;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.OrderItem;
import com.you_purchase.backenduser.entity.User;

import java.util.Date;
import java.util.List;

public class OrderInfoDTO {
    private long orderInfoId;

    private long storeId;

    private int status;

    private String OrderNo;

    private String storeName;

    private String tarPeople;

    private  String tarPhone;

    private String  tarAddress;

    private double totalPrice;

    private String createDate;

    private boolean judged;

    List<Commodity> orderItemList;

    private double tarLongitude;

    private double tarLatitude;



    //getter and setter

    public String getOrderNo() {
        return OrderNo;
    }

    public void setOrderNo(String orderNo) {
        OrderNo = orderNo;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getStoreId() {
        return storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public List<Commodity> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<Commodity> orderItemList) {
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

    public double getTarLongitude() {
        return tarLongitude;
    }

    public void setTarLongitude(double tarLongitude) {
        this.tarLongitude = tarLongitude;
    }

    public double getTarLatitude() {
        return tarLatitude;
    }

    public void setTarLatitude(double tarLatitude) {
        this.tarLatitude = tarLatitude;
    }
}
