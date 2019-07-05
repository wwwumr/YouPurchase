package com.sjtu.youpurchase.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

/**
 * 经销商对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Dealer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "dealerId")
    private Long dealerId;

    @Column(nullable = false, length = 31)
    private String userName;

    @Column(nullable = false, length = 31)
    private String password;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 31)
    private String realName;

    @Column(nullable = false, length = 31)
    private String contact;

    // 经销商头像url
    private String avatar;

    private boolean attached;

    @OneToOne
    @JsonIgnoreProperties(value = {"dealer"})
    @JoinColumn(name = "storeId")
    private Store store;

    // 这里override toString()方法是因为在有些时候调用时，防止出现无限递归的情况
    @Override
    public String toString() {
        return "Dealer{" +
                "dealerId=" + dealerId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", realName='" + realName + '\'' +
                ", contact='" + contact + '\'' +
                ", avatar='" + avatar + '\'' +
                ", attached=" + attached +
                ", store=" + store.getStoreId() +
                '}';
    }

}
