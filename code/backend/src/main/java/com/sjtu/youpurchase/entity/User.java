package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * 用户类对应的实体类
 * @author Chuyuxuan
 */
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userId")
    private Long Id;

    private String userName;

    private String password;

}
