package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.entity.Commodity;
import com.you_purchase.backenduser.entity.Store;

import java.util.List;

public class RecDTO {

    private long commodityId;

    private String commodityPic;

    private String commodityInfo;

    private long storeId;

    private String storePic;

    private String storeInfo;


    public RecDTO(Commodity commodity ,Store store){
        this.setCommodityId(commodity.getCommodityId());
        this.setCommodityInfo(commodity.getCommodityInfo());
        this.setCommodityPic(commodity.getCommodityCoverPicUrl());
        this.setStoreId(store.getStoreId());
        this.setStoreInfo(store.getStoreName());
        this.setStorePic(store.getCoverPicUrl());
    }
    //getter and setter

    public long getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(long commodityId) {
        this.commodityId = commodityId;
    }

    public String getCommodityPic() {
        return commodityPic;
    }

    public void setCommodityPic(String commodityPic) {
        this.commodityPic = commodityPic;
    }

    public String getCommodityInfo() {
        return commodityInfo;
    }

    public void setCommodityInfo(String commodityInfo) {
        this.commodityInfo = commodityInfo;
    }

    public long getStoreId() {
        return storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public String getStorePic() {
        return storePic;
    }

    public void setStorePic(String storePic) {
        this.storePic = storePic;
    }

    public String getStoreInfo() {
        return storeInfo;
    }

    public void setStoreInfo(String storeInfo) {
        this.storeInfo = storeInfo;
    }
}
