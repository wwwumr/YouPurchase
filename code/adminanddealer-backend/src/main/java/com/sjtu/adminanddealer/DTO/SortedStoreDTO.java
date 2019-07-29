package com.sjtu.adminanddealer.DTO;

/**
 * 经过排序后店铺的排序
 *
 * @author Chuyuxuan
 */
public class SortedStoreDTO {

    private StoreDTO storeDTO;

    private double distance;

    private Integer sales;

    private double score;

    public SortedStoreDTO() {
    }

    public SortedStoreDTO(StoreDTO storeDTO, double distance, Integer sales, double score) {
        this.storeDTO = storeDTO;
        this.distance = distance;
        this.sales = sales;
        this.score = score;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public StoreDTO getStoreDTO() {
        return storeDTO;
    }

    public void setStoreDTO(StoreDTO storeDTO) {
        this.storeDTO = storeDTO;
    }
}
