package com.sjtu.adminanddealer.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.parameter.StoreParameter;
import com.sjtu.adminanddealer.service.StoreService;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private DealerDao dealerDao;

    @Autowired
    private FileUploadUtil fileUploadUtil;

    @Value("${storeDefaultCoverPicUrl}")
    private String storeDefaultCoverPicUrl;

    @Override
    public List<StoreDTO> getAllStores() {
        List<Store> storeArrayList;
        List<StoreDTO> storeDTOList = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");
        storeArrayList = storeDao.getAllStores();
        for (Store s : storeArrayList
        ) {
            StoreDTO storeDTO = new StoreDTO();
            storeDTO.setKey(s.getStoreId());
            storeDTO.setStoreName(s.getStoreName());
            storeDTO.setAddress(s.getAddress());
            storeDTO.setContact(s.getContact());
            storeDTO.setCoverPicUrl(s.getCoverPicUrl());
            if (s.getDealer() != null) {
                storeDTO.setDealerId(s.getDealer().getDealerId().intValue());
                storeDTO.setDealerName(s.getDealer().getUserName());
            }
            String startHour = dateFormat.format(s.getOpenHourStart());
            String endHour = dateFormat.format(s.getOpenHourEnd());
            storeDTO.setStartHour(startHour);
            storeDTO.setEndHour(endHour);
            storeDTO.setDeliveryType(s.getDeliveryType());

            storeDTOList.add(storeDTO);

        }
        return storeDTOList;
    }

    @Override
    public StoreDTO getStoreByStoreId(Long storeId) {
        Store store = storeDao.getStoreByStoreId(storeId);
        if (store == null) {
            return new StoreDTO();
        }
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");
        String startHour = dateFormat.format(store.getOpenHourStart());
        String endHour = dateFormat.format(store.getOpenHourEnd());

        if (store.getDealer() != null) {
            StoreDTO dto = new StoreDTO(store.getStoreId(), store.getStoreName(), store.getAddress(),
                    store.getCoverPicUrl(), store.getContact(), startHour, endHour,
                    store.getDealer().getDealerId().intValue(), store.getDealer().getUserName(), store.getDeliveryType());
            return dto;
        } else {
            StoreDTO dto = new StoreDTO();
            dto.setKey(store.getStoreId());
            dto.setStoreName(store.getStoreName());
            dto.setAddress(store.getAddress());
            dto.setCoverPicUrl(store.getCoverPicUrl());
            dto.setContact(store.getContact());
            dto.setStartHour(startHour);
            dto.setEndHour(endHour);
            dto.setDeliveryType(store.getDeliveryType());
            return dto;
        }
    }

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
        Date start = castStringToDate(storeParameter.getStartHour());
        Date end = castStringToDate(storeParameter.getEndHour());
        store.setOpenHourStart(start);
        store.setOpenHourEnd(end);
        store.setDeliveryType(0);
        Long newId = storeDao.addAStore(store);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", newId);
        jsonObject.put("coverUrl", store.getCoverPicUrl());

        return jsonObject;
    }

    @Override
    public void updateStore(StoreParameter storeParameter) {
        Store store = storeDao.getStoreByStoreId(storeParameter.getKey());
        store.setContact(storeParameter.getContact());
        store.setStoreName(storeParameter.getStoreName());
        store.setAddress(storeParameter.getAddress());
        Date start = castStringToDate(storeParameter.getStartHour());
        Date end = castStringToDate(storeParameter.getEndHour());
        store.setOpenHourStart(start);
        store.setOpenHourEnd(end);

        storeDao.updateStore(store);
    }

    @Override
    public void deleteStore(Long storeId) {
        storeDao.deleteStore(storeId);
    }

    @Override
    public void bindDealerAndStore(Long dealerId, Long storeId) {
        Store store = storeDao.getStoreByStoreId(storeId);
        Dealer dealer = dealerDao.getDealerById(dealerId);
        if (store == null || dealer == null) {
            return;
        }
        // 当提交的表单未对绑定做修改时，直接跳过
        if (store.isAttached() || dealer.isAttached()) {
            return;
        } else {
            storeDao.bindDealerStore(dealerId, storeId);
        }
    }

    @Override
    public void unbindDealerAndStore(Long dealerId, Long storeId) {
        /* 缺少一个逻辑，检查经销商与店铺是否都是已经绑定过的，前端的逻辑是店铺页面解绑经销商
         * 这个一般不会出错，可能出错的点在绑定的过程*/
        storeDao.unbindDealerStore(dealerId, storeId);
    }

    @Override
    public List<StoreDTO> getAllUnbindStore() {
        List<Store> storeArrayList = storeDao.getAllUnbindStore();
        List<StoreDTO> storeDTOList = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");

        for (Store s : storeArrayList
        ) {
            StoreDTO storeDTO = new StoreDTO();
            storeDTO.setKey(s.getStoreId());
            storeDTO.setStoreName(s.getStoreName());
            storeDTO.setAddress(s.getAddress());
            storeDTO.setContact(s.getContact());
            storeDTO.setCoverPicUrl(s.getCoverPicUrl());

            String startHour = dateFormat.format(s.getOpenHourStart());
            String endHour = dateFormat.format(s.getOpenHourEnd());
            storeDTO.setStartHour(startHour);
            storeDTO.setEndHour(endHour);

            storeDTOList.add(storeDTO);

        }
        return storeDTOList;
    }

    @Override
    public String updateStoreCoverPic(MultipartFile file, Long storeId, String coverPicUrl) {
        // 当传过来的图片url是默认图片url时，直接新建文件并把路径存入数据库中
        if (coverPicUrl.equals(this.storeDefaultCoverPicUrl)) {
            String newUrl = fileUploadUtil.saveFile(file);
            storeDao.updateStoreCoverPic(storeId, newUrl);
            return newUrl;
        } else {
            String newUrl = fileUploadUtil.saveFile(file);
            storeDao.updateStoreCoverPic(storeId, newUrl);
            // 把原来存在的文件删除
            int i = fileUploadUtil.deleteFile(coverPicUrl);
            /// debug
//            System.out.println(i);
            return newUrl;
        }
    }

    @Override
    public void updateStoreDeliveryType(Integer type, Long storeId) {
        storeDao.updateStoreDeliveryType(type, storeId);
    }

    /**
     * 把前端发送的字符串形式的时间格式转换为Date，格式为HH:mm.
     *
     * @param strDate 以字符串形式的日期
     * @return Date形式的日期
     */
    private Date castStringToDate(String strDate) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
        try {
            return dateFormat.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
            return new Date();
        }
    }
}
