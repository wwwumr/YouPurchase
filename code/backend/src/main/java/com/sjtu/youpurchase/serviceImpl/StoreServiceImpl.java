package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.StoreDTO;
import com.sjtu.youpurchase.dao.StoreDao;
import com.sjtu.youpurchase.entity.Store;
import com.sjtu.youpurchase.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
            String startHour = dateFormat.format(s.getOpenHourStart());
            String endHour = dateFormat.format(s.getOpenHourEnd());
            String[] hours = {startHour, endHour};
            storeDTO.setHours(hours);

            storeDTOList.add(storeDTO);

        }
        return storeDTOList;
    }
}
