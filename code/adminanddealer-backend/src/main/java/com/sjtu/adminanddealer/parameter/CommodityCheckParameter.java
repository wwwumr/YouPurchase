package com.sjtu.adminanddealer.parameter;

/**
 * 检查商品的库存
 *
 * @author Chuyuxuan
 */
public class CommodityCheckParameter {

    private Long commodityId;

    private Integer demandAmount;

    public CommodityCheckParameter() {
    }

    public CommodityCheckParameter(Long commodityId, Integer demandAmount) {
        this.commodityId = commodityId;
        this.demandAmount = demandAmount;
    }

    public Long getCommodityId() {
        return commodityId;
    }

    public void setCommodityId(Long commodityId) {
        this.commodityId = commodityId;
    }

    public Integer getDemandAmount() {
        return demandAmount;
    }

    public void setDemandAmount(Integer demandAmount) {
        this.demandAmount = demandAmount;
    }

    @Override
    public String toString() {
        return "CommodityCheckParameter{" +
                "commodityId=" + commodityId +
                ", demandAmount=" + demandAmount +
                '}';
    }
}
