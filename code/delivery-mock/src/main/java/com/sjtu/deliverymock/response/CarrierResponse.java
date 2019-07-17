package com.sjtu.deliverymock.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CarrierResponse extends AbstractResponse {

    private CarrierData data;

    @JsonCreator
    public CarrierResponse(@JsonProperty("data") CarrierData carrierData){
        this.data = carrierData;
    }

    @JsonIgnoreProperties({"app_id"})
    public static class CarrierData {
        private String carrierPhone;
        private String carrierName;
        private double latitude;
        private double longitude;

        @JsonCreator
        public CarrierData(String carrierPhone, String carrierName, double latitude, double longitude){
            this.carrierPhone = carrierPhone;
            this.carrierName = carrierName;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public String getCarrierPhone() {
            return carrierPhone;
        }

        public void setCarrierPhone(String carrierPhone) {
            this.carrierPhone = carrierPhone;
        }

        public String getCarrierName() {
            return carrierName;
        }

        public void setCarrierName(String carrierName) {
            this.carrierName = carrierName;
        }

        public double getLatitude() {
            return latitude;
        }

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }

        @Override
        public String toString() {
            return "CarrierData{" +
                    "carrierPhone='" + carrierPhone + '\'' +
                    ", carrierName='" + carrierName + '\'' +
                    ", latitude=" + latitude +
                    ", longitude=" + longitude +
                    '}';
        }
    }

    public CarrierData getData() {
        return data;
    }

    public void setData(CarrierData data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "CarrierResponse{" +
                "data=" + data +
                ", code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
