package com.sjtu.youpurchase.sms;

public class SendSmsParameter {
    private String phone;

    private  int ttl;

    private String name;

    private String op;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getTtl() {
        return ttl;
    }

    public void setTtl(int ttl) {
        this.ttl = ttl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public SendSmsParameter(String phone, String opr){
        this.setPhone(phone);
        this.setTtl(5);
        this.setName("you-purchase");
        this.setOp(opr);
    }

}
