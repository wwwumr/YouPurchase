package com.you_purchase.backenduser.parameter;

public class OrderCheckParameter {
    //用户id
    private long id;

    private int status;

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
