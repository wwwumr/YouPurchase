package com.you_purchase.backenduser.entity;

import com.you_purchase.backenduser.parameter.OrderInfoParameter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class OrderInfo {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderInfoId")
    private long orderInfoId;

    private long userId;

    private long storeId;
    //执行状态，0：未支付 1：待发货 2：配送中 3：已送达
    private int status;

    //收货者信息
    private String tarPeople;

    private String tarAddress;

    private String tarPhone;

    //yyyy-MM-dd HH:mm:ss
    private Date createDate;

    private double totalPrice;
    //订单是否可用
    private boolean valid;

    private boolean judged;

    @JoinColumn(name = "deliveryAddressId")
    private Long deliveryAddressId;


    public void setOrderInfo(OrderInfoParameter orderInfoParameter,Date date){
        this.setValid(true);
        this.setJudged(false);
        this.setStatus(0);
        this.setUserId(orderInfoParameter.getUserId());
        this.setStoreId(orderInfoParameter.getStoreId());
        this.setTotalPrice(orderInfoParameter.getTotalPrice());
        this.setCreateDate(date);
        this.setTarAddress(orderInfoParameter.getTarAddress());
        this.setTarPeople(orderInfoParameter.getTarPeople());
        this.setTarPhone(orderInfoParameter.getTarPhone());
        this.setDeliveryAddressId(orderInfoParameter.getDeliveryAddressId());
    }




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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public Long getDeliveryAddressId() {
        return deliveryAddressId;
    }

    public void setDeliveryAddressId(Long deliveryAddressId) {
        this.deliveryAddressId = deliveryAddressId;
    }
}
