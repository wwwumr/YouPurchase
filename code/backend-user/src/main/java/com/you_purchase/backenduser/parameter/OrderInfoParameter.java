package com.you_purchase.backenduser.parameter;

import com.you_purchase.backenduser.dto.OrderListDTO;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.OrderItem;

import javax.persistence.JoinColumn;
import java.util.Date;
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

    private List<OrderListDTO> orderItemList;

    @JoinColumn(name = "deliveryAddressId")
    private Long deliveryAddressId;


    //getter and setter
    public List<OrderListDTO> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderListDTO> orderItemList) {
        this.orderItemList = orderItemList;
    }

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

    public Long getDeliveryAddressId() {
        return deliveryAddressId;
    }

    public void setDeliveryAddressId(Long deliveryAddressId) {
        this.deliveryAddressId = deliveryAddressId;
    }

    //getter and setter
}
