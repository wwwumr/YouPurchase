package com.you_purchase.backenduser.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class UserTag {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userTagId;


    private String type1;

    private String type2;

    private String type3;

    private String type4;

    //getter and setter

    public long getUserTagId() {
        return userTagId;
    }

    public void setUserTagId(long userTagId) {
        this.userTagId = userTagId;
    }

    public String getType4() {
        return type4;
    }

    public void setType4(String type4) {
        this.type4 = type4;
    }

    public String getType1() {
        return type1;
    }

    public void setType1(String type1) {
        this.type1 = type1;
    }

    public String getType2() {
        return type2;
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    public String getType3() {
        return type3;
    }

    public void setType3(String type3) {
        this.type3 = type3;
    }
}
