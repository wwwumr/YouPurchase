package com.sjtu.youpurchase.entity;


import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/*
* 用户评论对应实体类
* */
@Entity
@Data
public class Grade {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "gradeId")
    private long Id;

    @ManyToOne
    @JoinColumn(name="storeId")
    private Store store;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    @Column(length=256)
    private String context;

    @Column(length=1)
    private double score;


}
