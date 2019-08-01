package com.example.concurency;

import java.io.Serializable;

public class ItemInfo implements Serializable {

    private Long itemId;

    private Integer number;

    public ItemInfo(Long itemId, Integer number) {
        this.itemId = itemId;
        this.number = number;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
