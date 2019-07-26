package com.sjtu.adminanddealer.parameter;

/**
 * 经销商修改店铺地址时传递的信息
 *
 * @author Chuyuxuan
 */
public class StoreAddressParameter {

    private String address;

    private double latitude;

    private double longitude;

    public StoreAddressParameter() {
    }

    public StoreAddressParameter(String address, double latitude, double longitude) {
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
}
