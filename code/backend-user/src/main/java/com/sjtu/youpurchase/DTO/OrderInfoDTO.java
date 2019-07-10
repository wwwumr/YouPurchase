package com.sjtu.youpurchase.DTO;

import com.sjtu.youpurchase.entity.OrderInfo;
import com.sjtu.youpurchase.entity.OrderItem;
import com.sjtu.youpurchase.parameter.OrderPostParameter;

import java.util.Date;
import java.util.List;

public class OrderInfoDTO{

    private String storeName;

    private String status;

    private  String userName;

    private long userId;

    private Date createTime;

    private double totalPrice;

    private List<OrderItem> orderItemList;



    public OrderInfoDTO(OrderInfo orderInfo){
        if(orderInfo != null);
        this.setUserId(orderInfo.getUserId());
        this.setOrderItemList(orderInfo.getOrderItemList());
        this.setTotalPrice(orderInfo.getTotalPrice());
        this.setCreateTime(orderInfo.getCreateTime());
        this.setUserName(orderInfo.getUserName());
        this.setStatus(orderInfo.getStatus());
        this.setStoreName(orderInfo.getStoreName());

    }


    //getter and settrer
    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }
}
