package com.sjtu.youpurchase.parameter;

import lombok.Data;

/**
 * 前端发送新建一个经销商的数据格式
 *
 * @author Chuyuxuan
 */
@Data
public class DealerParameter {
    private Long key;

    private String userName;

    private String address;

    private String realName;

    private String contact;

    private String password;
}
