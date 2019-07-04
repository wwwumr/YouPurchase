package com.sjtu.youpurchase.parameter;

import lombok.Data;

/**
 * 从前端接受的新建店铺的信息
 */
@Data
public class StoreParameter {
    private Long key;

    private String storeName;

    private String address;

    private String contact;

    private String[] hours;

}
