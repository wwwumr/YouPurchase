package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * 商品信息对应的实体类
 *
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

    @ElementCollection
    @CollectionTable(name = "commodityPicUrls",
            joinColumns = {@JoinColumn(name = "commodityId", referencedColumnName = "commodityId")})
    private List<String> commodityPicUrls;

    private Boolean onShelves;

    private Integer inventory;
}
