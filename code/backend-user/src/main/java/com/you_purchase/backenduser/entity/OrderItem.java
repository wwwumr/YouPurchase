package com.you_purchase.backenduser.entity;


import javax.persistence.*;


@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderItemId")
    private Long orderItemId;

    private long orderInfoId;

    @OneToOne
    @JoinColumn(name = "commodityId")
    private Commodity commodity;

    private Integer amount;

    @Column(scale = 2)
    private Double price;



    //getter and setter
    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public long getOrderInfoId() {
        return orderInfoId;
    }

    public void setOrderInfoId(long orderInfoId) {
        this.orderInfoId = orderInfoId;
    }

    public Commodity getCommodity() {
        return commodity;
    }

    public void setCommodity(Commodity commodity) {
        this.commodity = commodity;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
