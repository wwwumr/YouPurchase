package com.sjtu.deliverymock.request;

import com.sjtu.deliverymock.util.JsonUtils;
import com.sjtu.deliverymock.util.URLUtils;

import java.io.IOException;

public class ElemeQueryCarrierRequest extends AbstractRequest{
    private ElemeQueryCarrierRequest.ElemeQueryRequestData data;

    public String getData() throws IOException {
        return URLUtils.getInstance().urlEncode(JsonUtils.getInstance().objectToJson(data));
    }

    public void setData(ElemeQueryCarrierRequest.ElemeQueryRequestData data) {
        this.data = data;
    }

    public static class ElemeQueryRequestData {
        private String partner_order_code;

        public String getPartner_order_code() {
            return partner_order_code;
        }

        public void setPartner_order_code(String partner_order_code) {
            this.partner_order_code = partner_order_code;
        }
    }

}
