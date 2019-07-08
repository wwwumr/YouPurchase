package com.sjtu.adminanddealer.entity;

import com.sjtu.adminanddealer.parameter.OrderPostParameter;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 订单对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class OrderInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderInfoId")
    private Long orderInfoId;

    private String storeName;

    //订单状态
    @Column(length = 5)
    private String status;

    private String userName;

    private long userId;

    private Date createTime;

    private double totalPrice;

    @OneToMany
    @JoinColumn(name = "orderItemId")
    private List<OrderItem> orderItemList;

    //是否可用
    private boolean valid;


    /*
     * Deng Xiao
     * */
    //获取订单信息并设置
    public void setOrderInfo(OrderPostParameter orderPostParameter) {
        this.setStatus("已接单");
        this.setTotalPrice(orderPostParameter.getTotalPrice());
        this.setUserId(orderPostParameter.getUserId());
        this.setOrderItemList(orderPostParameter.getOrderItemList());
        this.setCreateTime(orderPostParameter.getCreateTime());
        this.setStoreName(orderPostParameter.getStoreName());
        this.setValid(true);

    }


    //getter and setter


    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public Long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(Long orderInfoId) {
        this.orderInfoId = orderInfoId;
    }

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
