package com.sjtu.youpurchase.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.youpurchase.DTO.StoreDTO;
import com.sjtu.youpurchase.dao.StoreDao;
import com.sjtu.youpurchase.entity.Store;
import com.sjtu.youpurchase.parameter.StoreParameter;
import com.sjtu.youpurchase.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * StoreService的实现类.
 *
 * @author Chuyuxuan
 */
@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreDao storeDao;

    @Override
    public List<StoreDTO> getAllStores() {
        List<Store> storeArrayList = new ArrayList<>();
        List<StoreDTO> storeDTOList = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("kk:mm");
        storeArrayList = storeDao.getAllStores();
        for (Store s : storeArrayList
        ) {
            StoreDTO storeDTO = new StoreDTO();
            storeDTO.setKey(s.getStoreId());
            storeDTO.setStoreName(s.getStoreName());
            storeDTO.setAddress(s.getAddress());
            storeDTO.setContact(s.getContact());
            storeDTO.setCoverPicUrl(s.getCoverPicUrl());
            storeDTO.setDealerId(s.getDealer().getDealerId().intValue());
            storeDTO.setDealerName(s.getDealer().getUserName());
            String startHour = dateFormat.format(s.getOpenHourStart());
            String endHour = dateFormat.format(s.getOpenHourEnd());
            String[] hours = {startHour, endHour};
            storeDTO.setHours(hours);

            storeDTOList.add(storeDTO);

        }
        return storeDTOList;
    }

    @Value("${imageBaseDirectory}")
    private String imageBaseDirectory;

    @Value("${storeDefaultCoverPicUrl}")
    private String storeDefaultCoverPicUrl;

    @Override
    public JSONObject addAStore(StoreParameter storeParameter) {


        Store store = new Store();
        store.setStoreName(storeParameter.getStoreName());
        store.setCoverPicUrl(this.storeDefaultCoverPicUrl);
        store.setAddress(storeParameter.getAddress());
        // TODO: 调用外部API而不是设成0
        store.setLongitude(0.0);
        store.setLatitude(0.0);
        store.setContact(storeParameter.getContact());
        store.setAttached(false);
        Date start = new Date();
        Date end = new Date();
        castStringToDate(storeParameter.getHours()[0],storeParameter.getHours()[1],start,end);
        store.setOpenHourStart(start);
        store.setOpenHourEnd(end);
        storeDao.addAStore(store);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", store.getStoreId());
        jsonObject.put("coverUrl", store.getCoverPicUrl());

        return jsonObject;
    }

    @Override
    public void updateStore(StoreParameter storeParameter) {
        Store store = storeDao.getStoreByStoreId(storeParameter.getKey());
        store.setContact(storeParameter.getContact());
        store.setStoreName(storeParameter.getStoreName());
        store.setAddress(storeParameter.getAddress());
        Date start = new Date();
        Date end = new Date();
        castStringToDate(storeParameter.getHours()[0],storeParameter.getHours()[1],start,end);
        store.setOpenHourStart(start);
        store.setOpenHourEnd(end);

        storeDao.updateStore(store);
    }

    @Override
    public void updateStoreCoverPic() {

    }

    /**
     * 把前端发送的字符串形式的时间格式转换为Date，格式为kk:mm
     * @param startStr 字符串形式的开始营业时间
     * @param endStr 字符串形式的结束营业时间
     * @param start 开始营业时间
     * @param end 结束营业时间
     */
    private void castStringToDate(String startStr, String endStr, Date start, Date end){
        SimpleDateFormat dateFormat = new SimpleDateFormat("kk:mm");try{
            start = dateFormat.parse(startStr);
            end = dateFormat.parse(endStr);
        } catch (ParseException e){
            e.printStackTrace();
        }

    }
}
