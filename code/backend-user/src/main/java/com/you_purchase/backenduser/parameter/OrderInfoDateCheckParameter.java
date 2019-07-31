package com.you_purchase.backenduser.parameter;

import io.swagger.annotations.ApiParam;


//前端查看特定日期段内的订单
public class OrderInfoDateCheckParameter {
    private long storeId;

    //开始日期
    @ApiParam(value = "开始日期")
    private String sDate;

    //结束日期
    @ApiParam(value = "结束日期")
    private String eDate;



    //getter and setter
    public long getStoreId() {
        return storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public String getsDate() {
        return sDate;
    }

    public void setsDate(String sDate) {
        this.sDate = sDate;
    }

    public String geteDate() {
        return eDate;
    }

    public void seteDate(String eDate) {
        this.eDate = eDate;
    }
}
