package com.you_purchase.backenduser.parameter;




/*
* 前端申请查看订单信息
* */
public class OrderInfoCheckParameter {
    //用户或是商家的id
    private long id;

    private int status;


    //getter and setter
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
