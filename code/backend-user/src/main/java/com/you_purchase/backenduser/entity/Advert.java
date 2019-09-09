package com.you_purchase.backenduser.entity;

import com.you_purchase.backenduser.parameter.AdvertParameter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Advert {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long advertId;

    private String title;

    private String text;



    public void setInfo(AdvertParameter advertParameter){
        this.setText(advertParameter.getText());
        this.setTitle(advertParameter.getTitle());

    }




    //getter and setter
    public long getAdvertId() {
        return advertId;
    }

    public void setAdvertId(long advertId) {
        this.advertId = advertId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
