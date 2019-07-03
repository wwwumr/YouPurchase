package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.StoreResponseDTO;
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
    public List<StoreResponseDTO> getAllStores() {
        List<Store> storeArrayList = new ArrayList<>();
        List<StoreResponseDTO> storeResponseDTOList = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("kk:mm");
        storeArrayList = storeDao.getAllStores();
        for (Store s : storeArrayList
        ) {
            StoreResponseDTO storeResponseDTO = new StoreResponseDTO();
            storeResponseDTO.setKey(s.getStoreId());
            storeResponseDTO.setStoreName(s.getStoreName());
            storeResponseDTO.setAddress(s.getAddress());
            storeResponseDTO.setContact(s.getContact());
            storeResponseDTO.setCoverPicUrl(s.getCoverPicUrl());
            storeResponseDTO.setDealerId(s.getDealer().getDealerId().intValue());
            String startHour = dateFormat.format(s.getOpenHourStart());
            String endHour = dateFormat.format(s.getOpenHourEnd());
            String[] hours = {startHour, endHour};
            storeResponseDTO.setHours(hours);

            storeResponseDTOList.add(storeResponseDTO);

        }
        return storeResponseDTOList;
    }
}
