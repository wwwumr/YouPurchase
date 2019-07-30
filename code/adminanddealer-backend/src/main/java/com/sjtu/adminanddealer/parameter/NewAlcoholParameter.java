package com.sjtu.adminanddealer.parameter;

// TODO: 需要什么其他的字段还可以更新
public class NewAlcoholParameter {

    private String alcoholInfo;

    private String coverPicUrl;

    private Short degree;

    public NewAlcoholParameter() {
    }

    public String getAlcoholInfo() {
        return alcoholInfo;
    }

    public void setAlcoholInfo(String alcoholInfo) {
        this.alcoholInfo = alcoholInfo;
    }

    public String getCoverPicUrl() {
        return coverPicUrl;
    }

    public void setCoverPicUrl(String coverPicUrl) {
        this.coverPicUrl = coverPicUrl;
    }

    public Short getDegree() {
        return degree;
    }

    public void setDegree(Short degree) {
        this.degree = degree;
    }
}
