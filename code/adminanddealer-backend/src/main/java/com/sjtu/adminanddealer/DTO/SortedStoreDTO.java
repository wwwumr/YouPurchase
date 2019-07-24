package com.sjtu.adminanddealer.DTO;

/**
 * 经过排序后店铺的排序
 *
 * @author Chuyuxuan
 */
public abstract class SortedStoreDTO {

    protected StoreDTO storeDTO;

    public StoreDTO getStoreDTO() {
        return storeDTO;
    }

    public void setStoreDTO(StoreDTO storeDTO) {
        this.storeDTO = storeDTO;
    }
}
