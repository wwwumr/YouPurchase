package com.you_purchase.backenduser.parameter;

public class UserPhotoParameter {
    private String photoImage;

    private long userId;


    //getter and setter

    public String getPhotoImage() {
        return photoImage;
    }

    public void setPhotoImage(String photoImage) {
        this.photoImage = photoImage;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
