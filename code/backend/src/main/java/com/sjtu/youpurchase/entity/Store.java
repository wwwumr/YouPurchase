package com.sjtu.youpurchase.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * 店铺对应的实体类.
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "storeId")
    private Long storeId;

    @Column(nullable = false, length = 31)
    private String storeName;

    private String coverPicUrl;

    @Column(nullable = false)
    private String address;

    private double longitude;

    private double latitude;

    @Column(nullable = false)
    private String contact;

    private Date openHourStart;

    private Date openHourEnd;

    private boolean attached;

    @OneToOne
    @JsonIgnoreProperties(value = {"store"})
    @JoinColumn(name = "dealerId")
    private Dealer dealer;

    @OneToMany(targetEntity = Commodity.class)
    @JoinTable(name = "storeCommodity", joinColumns = {@JoinColumn(name = "storeId", referencedColumnName = "storeId")},
            inverseJoinColumns = {@JoinColumn(name = "commodityId", referencedColumnName = "commodityId")})
    private List<Commodity> commodityList;


    // 这里override toString()方法是因为在有些时候调用时，防止出现无限递归的情况
    @Override
    public String toString() {
        return "Store{" +
                "storeId=" + storeId +
                ", storeName='" + storeName + '\'' +
                ", coverPicUrl='" + coverPicUrl + '\'' +
                ", address='" + address + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", contact='" + contact + '\'' +
                ", openHourStart=" + openHourStart +
                ", openHourEnd=" + openHourEnd +
                ", attached=" + attached +
                ", dealer=" + dealer.getDealerId() +
                ", commodityList=" + commodityList +
                '}';
    }

}
