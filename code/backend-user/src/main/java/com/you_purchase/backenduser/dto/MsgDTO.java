package com.you_purchase.backenduser.dto;

import com.you_purchase.backenduser.Sms.Message;

public class MsgDTO {
    private long msgId;

    private long time;

    private String code;

    private String phone;

    public  MsgDTO(Message message){
        if(message != null){
            this.setMsgId(message.getMessageId());
            this.setCode(message.getCode());
            this.setPhone(message.getPhone());
            this.setTime(message.getTime());
        }
    }



    //getter and setter
    public long getMsgId() {
        return msgId;
    }

    public void setMsgId(long msgId) {
        this.msgId = msgId;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
