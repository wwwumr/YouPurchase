package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.entity.OrderInfo;

import java.util.Date;
import java.util.List;

public class OrderPayDTO {
    private  long orderPayId;

    private String orderNo;

    private String createDate;

    private double totalPrice;

    private List<CommodityShortageDTO> shortageDTOS;


    public OrderPayDTO(OrderInfo orderInfo, List<CommodityShortageDTO> dtos,String createDate){
        if(orderInfo != null){
            this.setOrderPayId(orderInfo.getOrderInfoId());
            this.setCreateDate(createDate);
            this.setOrderNo(orderInfo.getOrderInfoNo());
            this.setTotalPrice(orderInfo.getTotalPrice());
        }
        this.shortageDTOS = dtos;
    }



    //getter and setter

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public long getOrderPayId() {
        return orderPayId;
    }

    public void setOrderPayId(long orderPayId) {
        this.orderPayId = orderPayId;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<CommodityShortageDTO> getShortageDTOS() {
        return shortageDTOS;
    }

    public void setShortageDTOS(List<CommodityShortageDTO> shortageDTOS) {
        this.shortageDTOS = shortageDTOS;
    }
}
