package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * 商品信息对应的实体类
 * @author Chuyuxuan
 */
@Data
@Entity
public class Commodity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "commodityId")
    private Long Id;

    @Column(scale = 2)
    private double price;

    private String commodityInfo;

    /// TODO: 这里的问题是无法为String映射出一张新的表，想通过手动建表然后添加@JoinColoum注解来解决
//    @OneToMany(targetEntity = String.class)
//    private List<String> commodityPicUrls;

    private Boolean onShelves;

    private Integer inventory;
}
