package com.sjtu.deliverymock.request;

public class QueryCarrierRequest {
    private String partner_order_code;

    public QueryCarrierRequest() {
    }

    public QueryCarrierRequest(String partner_order_code) {
        this.partner_order_code = partner_order_code;
    }

    public String getPartner_order_code() {
        return partner_order_code;
    }

    public void setPartner_order_code(String partner_order_code) {
        this.partner_order_code = partner_order_code;
    }
}
