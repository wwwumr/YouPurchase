package com.sjtu.deliverymock.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderQueryResponse extends AbstractResponse {

    private OrderQueryData data;

    @JsonCreator
    public OrderQueryResponse(@JsonProperty("data") OrderQueryData data){
        this.data = data;
    }

    @JsonIgnoreProperties({"app_id"})
    public static class OrderQueryData{

    }

    public OrderQueryData getData() {
        return data;
    }

    public void setData(OrderQueryData data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "OrderQueryResponse{" +
                "data=" + data +
                ", code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
