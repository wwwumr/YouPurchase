package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.entity.OrderInfo;

import java.util.Date;
import java.util.List;

public class OrderPayDTO {
    private  long orderPayId;

    private String createDate;

    private double totalPrice;

    private List<CommodityShortageDTO> shortageDTOS;


    public OrderPayDTO(OrderInfo orderInfo, List<CommodityShortageDTO> dtos){
        if(orderInfo != null){
            this.setOrderPayId(orderInfo.getOrderInfoId());
            this.setCreateDate(orderInfo.getCreateDate());
            this.setTotalPrice(orderInfo.getTotalPrice());
        }
        this.shortageDTOS = dtos;
    }



    //getter and setter
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
