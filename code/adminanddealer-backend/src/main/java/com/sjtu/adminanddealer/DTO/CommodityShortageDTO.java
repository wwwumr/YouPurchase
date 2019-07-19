package com.sjtu.adminanddealer.DTO;

/**
 * 当商品余量不足时放回的数据
 *
 * @author Chuyuxuan
 */
public class CommodityShortageDTO {

    private Long commodityId;

    private Integer actualRemaining;

    public CommodityShortageDTO() {
    }

    public CommodityShortageDTO(Long commodityId, Integer actualRemaining) {
        this.commodityId = commodityId;
        this.actualRemaining = actualRemaining;
    }

    public Long getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(Long commodityId) {
        this.commodityId = commodityId;
    }

    public Integer getActualRemaining() {
        return actualRemaining;
    }

    public void setActualRemaining(Integer actualRemaining) {
        this.actualRemaining = actualRemaining;
    }

    @Override
    public String toString() {
        return "CommodityShortageDTO{" +
                "commodityId=" + commodityId +
                ", actualRemaining=" + actualRemaining +
                '}';
    }
}
