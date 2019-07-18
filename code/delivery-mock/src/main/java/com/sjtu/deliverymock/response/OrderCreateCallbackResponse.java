package com.sjtu.deliverymock.response;

public class OrderCreateCallbackResponse extends AbstractResponse {

    private OrderCreateCallbackData data;

    public OrderCreateCallbackResponse(OrderCreateCallbackData data) {
        this.data = data;
    }

    public static class OrderCreateCallbackData{
        private String partner_order_code;

        public String getPartner_order_code() {
            return partner_order_code;
        }

        public void setPartner_order_code(String partner_order_code) {
            this.partner_order_code = partner_order_code;
        }

        @Override
        public String toString() {
            return "OrderCreateCallbackData{" +
                    "partner_order_code='" + partner_order_code + '\'' +
                    '}';
        }
    }

    public OrderCreateCallbackData getData() {
        return data;
    }

    public void setData(OrderCreateCallbackData data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "OrderCreateCallbackResponse{" +
                "data=" + data +
                ", code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
