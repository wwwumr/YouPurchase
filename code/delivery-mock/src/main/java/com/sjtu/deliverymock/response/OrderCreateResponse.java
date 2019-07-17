package com.sjtu.deliverymock.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderCreateResponse extends AbstractResponse {

    private OrderCreateData data;

    @JsonCreator
    public OrderCreateResponse(@JsonProperty("data") OrderCreateData data){
        this.data = data;
    }

    public static class OrderCreateData{

    }

    public OrderCreateData getData() {
        return data;
    }

    public void setData(OrderCreateData data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "OrderCreateResponse{" +
                "data=" + data +
                ", code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
