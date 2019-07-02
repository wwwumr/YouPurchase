package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * 订单项对应的实体类
 * @author Chuyuxuan
 */
@Data
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderItemId")
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "orderInfoId")
    private OrderInfo orderInfo;

    @OneToOne
    @JoinColumn(name = "commodityId")
    private Commodity commodity;

    private Integer amount;

    @Column(scale = 2)
    private Double price;

}
