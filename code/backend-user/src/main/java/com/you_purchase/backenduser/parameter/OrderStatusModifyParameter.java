package com.you_purchase.backenduser.parameter;


/*
* 商家修改订单状态
* */


public class OrderStatusModifyParameter {
    private long orderInfoId;

    private int status;


    //getter and setter

    public long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(long orderInfoId) {
        this.orderInfoId = orderInfoId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
