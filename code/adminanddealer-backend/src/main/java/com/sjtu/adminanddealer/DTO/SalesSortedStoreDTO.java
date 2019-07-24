package com.sjtu.adminanddealer.DTO;

/**
 * 根据销量排序店铺
 *
 * @author Chuyuxuan
 */
public class SalesSortedStoreDTO extends SortedStoreDTO {

    private Integer sales;

    public SalesSortedStoreDTO(Integer sales, StoreDTO storeDTO) {
        this.sales = sales;
        this.storeDTO = storeDTO;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }
}
