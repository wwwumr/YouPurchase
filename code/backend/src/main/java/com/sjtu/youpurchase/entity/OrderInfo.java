package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
    private Long Id;

    private Store store;

    private User user;

    private Date createTime;

    private double totalPrice;

    private List<OrderItem> orderItemList;

}
