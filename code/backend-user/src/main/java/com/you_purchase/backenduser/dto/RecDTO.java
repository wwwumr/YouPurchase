package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.entity.Commodity;
import com.you_purchase.backenduser.entity.Store;

import java.util.List;

public class RecDTO {

    private Commodity commodity;

    private Store store;




    public RecDTO(Commodity commodity ,Store store){
        this.setCommodity(commodity);
        this.setStore(store);
    }
    //getter and setter

    public Commodity getCommodity() {
        return commodity;
    }

    public void setCommodity(Commodity commodity) {
        this.commodity = commodity;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}
