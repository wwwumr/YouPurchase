package com.you_purchase.backenduser.service;

import com.you_purchase.backenduser.entity.Advert;
import com.you_purchase.backenduser.parameter.AdvertParameter;
import org.springframework.stereotype.Service;

@Service
public class AdvertService extends BaseService {
    //添加广告
    public long AddAdvert(AdvertParameter advertParameter){
        Advert advert = new Advert();
        advert.setInfo(advertParameter);
        advertDao.save(advert);
        return 200;
    }

    //用户获取广告id
    public long AdvertGet(){
        return advertDao.advertFind();
    }


    //用户查看广告
    public Advert AdvertAcess(long advertId){
        return advertDao.findByAdvertId(advertId);
    }

}
