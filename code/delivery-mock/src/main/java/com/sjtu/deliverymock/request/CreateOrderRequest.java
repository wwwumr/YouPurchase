package com.sjtu.deliverymock.request;

public class CreateOrderRequest {
    private String partner_order_code;
    private String notify_url;
    private String receiver_name;
    private String receiver_phone;
    private String receiver_address;
    private double receiver_longitude;
    private double receiver_latitude;
    private String transport_name;
    private String transport_address;
    private String transport_tel;
    private double transport_longitude;
    private double transport_latitude;

    public CreateOrderRequest() {
    }

    public CreateOrderRequest(String partner_order_code, String notify_url, String receiver_name, String receiver_phone, String receiver_address, double receiver_longitude, double receiver_latitude, String transport_name, String transport_address, String transport_tel, double transport_longitude, double transport_latitude) {
        this.partner_order_code = partner_order_code;
        this.notify_url = notify_url;
        this.receiver_name = receiver_name;
        this.receiver_phone = receiver_phone;
        this.receiver_address = receiver_address;
        this.receiver_longitude = receiver_longitude;
        this.receiver_latitude = receiver_latitude;
        this.transport_name = transport_name;
        this.transport_address = transport_address;
        this.transport_tel = transport_tel;
        this.transport_longitude = transport_longitude;
        this.transport_latitude = transport_latitude;
    }

    public String getPartner_order_code() {
        return partner_order_code;
    }

    public void setPartner_order_code(String partner_order_code) {
        this.partner_order_code = partner_order_code;
    }

    public String getNotify_url() {
        return notify_url;
    }

    public void setNotify_url(String notify_url) {
        this.notify_url = notify_url;
    }

    public String getReceiver_name() {
        return receiver_name;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public String getReceiver_phone() {
        return receiver_phone;
    }

    public void setReceiver_phone(String receiver_phone) {
        this.receiver_phone = receiver_phone;
    }

    public String getReceiver_address() {
        return receiver_address;
    }

    public void setReceiver_address(String receiver_address) {
        this.receiver_address = receiver_address;
    }

    public double getReceiver_longitude() {
        return receiver_longitude;
    }

    public void setReceiver_longitude(double receiver_longitude) {
        this.receiver_longitude = receiver_longitude;
    }

    public double getReceiver_latitude() {
        return receiver_latitude;
    }

    public void setReceiver_latitude(double receiver_latitude) {
        this.receiver_latitude = receiver_latitude;
    }

    public String getTransport_name() {
        return transport_name;
    }

    public void setTransport_name(String transport_name) {
        this.transport_name = transport_name;
    }

    public String getTransport_address() {
        return transport_address;
    }

    public void setTransport_address(String transport_address) {
        this.transport_address = transport_address;
    }

    public String getTransport_tel() {
        return transport_tel;
    }

    public void setTransport_tel(String transport_tel) {
        this.transport_tel = transport_tel;
    }

    public double getTransport_longitude() {
        return transport_longitude;
    }

    public void setTransport_longitude(double transport_longitude) {
        this.transport_longitude = transport_longitude;
    }

    public double getTransport_latitude() {
        return transport_latitude;
    }

    public void setTransport_latitude(double transport_latitude) {
        this.transport_latitude = transport_latitude;
    }

    @Override
    public String toString() {
        return "CreateOrderRequest{" +
                "partner_order_code='" + partner_order_code + '\'' +
                ", notify_url='" + notify_url + '\'' +
                ", receiver_name='" + receiver_name + '\'' +
                ", receiver_phone='" + receiver_phone + '\'' +
                ", receiver_address='" + receiver_address + '\'' +
                ", receiver_longitude=" + receiver_longitude +
                ", receiver_latitude=" + receiver_latitude +
                ", transport_name='" + transport_name + '\'' +
                ", transport_address='" + transport_address + '\'' +
                ", transport_tel='" + transport_tel + '\'' +
                ", transport_longitude=" + transport_longitude +
                ", transport_latitude=" + transport_latitude +
                '}';
    }
}
