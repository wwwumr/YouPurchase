package com.sjtu.youpurchase.DTO;

import lombok.Data;

@Data
public class StoreDTO {

    private Long key;

    private String storeName;

    private String address;

    private String coverPicUrl;

    private String contact;

    /*总共有两个元素,hour[0]营业开始时间,hours[1]结束时间,格式均为HH:mm*/
    private String[] hours;

    private Integer dealerId;

    private String dealerName;

}
