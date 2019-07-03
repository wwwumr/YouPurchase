package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * 管理员账户对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "adminId")
    private Long adminId;

    @Column(nullable = false, unique = true, length = 31)
    private String userName;

    @Column(nullable = false, length = 31)
    private String password;
}
