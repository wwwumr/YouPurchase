package com.sjtu.adminanddealer.DTO;

/**
 * 根据店铺的评分进行排序
 *
 * @author Chuyuxuan
 */
public class GradeSortedStoreDTO extends SortedStoreDTO {

    private double grade;

    public GradeSortedStoreDTO(double grade, StoreDTO storeDTO) {
        this.grade = grade;
        this.storeDTO = storeDTO;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }
}
