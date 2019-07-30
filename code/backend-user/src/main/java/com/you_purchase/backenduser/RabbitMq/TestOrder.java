package com.you_purchase.backenduser.RabbitMq;

import java.io.Serializable;

public class TestOrder implements Serializable {
    private long userId;

    private long storeId;

    private String createDate;

    private String tarAddress;



    //getter and setter

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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getTarAddress() {
        return tarAddress;
    }

    public void setTarAddress(String tarAddress) {
        this.tarAddress = tarAddress;
    }


    @Override
    public String toString(){
        return "TestOrder {"+
                " userId " + userId+
                " storeId "+ storeId+
                " createDate "+createDate+
                " tarAddress "+tarAddress+
                "}";
    }
}
