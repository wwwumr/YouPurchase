package com.example.hp.login;
public class Goods{
    private String name;
    private int goodId;
    public Goods(String name,int goodId){
        this.name=name;
        this.goodId = goodId;
    }
    public String getName(){
        return name;
    }
    public int getGoodId(){
        return goodId;
    }
}