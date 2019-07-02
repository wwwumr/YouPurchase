package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * 用户类对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userId")
    private Long Id;

    @Column(nullable = false, unique = true, length = 30)
    private String userName;

    @Column(nullable = false, length = 30)
    private String password;

    //地区位置
    @Column(length = 30)
    private String area;

    //街道地址
    @Column(length = 30, nullable = false)
    private String address;

    @Column(length = 11)
    private String phone;

    @Column(length = 256)
    private String imgFile;

}
