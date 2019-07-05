package com.sjtu.youpurchase.DTO;

import com.sjtu.youpurchase.entity.User;

/*
 * created by Deng Xiao
 **/

public class UserLoginDTO extends UserInfoDTO {
    private int status;

    public UserLoginDTO(int code, User user) {
        super(user);
        this.setStatus(code);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}