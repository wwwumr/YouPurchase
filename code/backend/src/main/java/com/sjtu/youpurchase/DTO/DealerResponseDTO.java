package com.sjtu.youpurchase.DTO;

import lombok.Data;

/**
 * 返回前端的经销商数据格式
 *
 * @author Chuyuxuan
 */
@Data
public class DealerResponseDTO {

    private Long key;

    private String userName;

    private String address;

    private String realName;

    private String contact;

    private String storeName;

    private String password;
}
