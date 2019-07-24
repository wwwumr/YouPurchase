package com.sjtu.adminanddealer.DTO;

public class DistanceSortedStoreDTO extends SortedStoreDTO {

    private double distance;

    public DistanceSortedStoreDTO(double distance, StoreDTO storeDTO) {
        this.distance = distance;
        this.storeDTO = storeDTO;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
