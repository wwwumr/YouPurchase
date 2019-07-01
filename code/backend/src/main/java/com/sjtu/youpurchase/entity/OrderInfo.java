package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 订单对应的实体类
 * @author Chuyuxuan
 */
@Data
@Entity
public class OrderInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderInfoId")
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "storeId")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private Date createTime;

    private double totalPrice;

    @OneToMany
    @JoinColumn(name = "orderItemId")
    private List<OrderItem> orderItemList;

}
