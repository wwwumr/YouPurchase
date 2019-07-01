package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 店铺对应的实体类
 * @author Chuyuxuan
 */
@Data
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column(nullable = false, length = 31)
    private String storeName;

    private String coverPicUrl;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String contact;

    private Date openHourStart;

    private Date openHourEnd;

    @OneToMany
    private List<Commodity> commodityList;

}
