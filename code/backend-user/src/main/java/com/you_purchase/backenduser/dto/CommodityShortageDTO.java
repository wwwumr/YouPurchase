package com.you_purchase.backenduser.dto;

/**
 * 当商品余量不足时返回的数据
 * 格式：{商品id：,实际余量: }
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
