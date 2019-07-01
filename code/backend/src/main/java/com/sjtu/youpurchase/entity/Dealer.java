package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * 经销商对应的实体类
 * @author Chuyuxuan
 */
@Data
@Entity
public class Dealer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column(nullable = false, length = 31)
    private String userName;

    @Column(nullable = false, length = 31)
    private String password;

    @Column(nullable = false, length = 31)
    private String realName;

    @Column(nullable = false, length = 31)
    private String contact;

    @OneToOne
    private Store store;

}
