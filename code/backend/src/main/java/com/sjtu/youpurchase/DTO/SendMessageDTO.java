package com.sjtu.youpurchase.DTO;

public class SendMessageDTO {
    private String msg;

    private SendMessageDTO(String message){this.setMsg(message);}

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
