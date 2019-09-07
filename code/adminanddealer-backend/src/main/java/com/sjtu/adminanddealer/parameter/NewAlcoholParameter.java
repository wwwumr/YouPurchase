package com.sjtu.adminanddealer.parameter;


public class NewAlcoholParameter {

    private Long alcoholId;

    private String alcoholInfo;

    private Integer remaining;

    private double price;

    public NewAlcoholParameter() {
    }

    public NewAlcoholParameter(String alcoholInfo, Integer remaining, double price) {
        this.alcoholInfo = alcoholInfo;
        this.remaining = remaining;
        this.price = price;
    }

    public Long getAlcoholId() {
        return alcoholId;
    }

    public void setAlcoholId(Long alcoholId) {
        this.alcoholId = alcoholId;
    }

    public String getAlcoholInfo() {
        return alcoholInfo;
    }

    public void setAlcoholInfo(String alcoholInfo) {
        this.alcoholInfo = alcoholInfo;
    }

    public Integer getRemaining() {
        return remaining;
    }

    public void setRemaining(Integer remaining) {
        this.remaining = remaining;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
