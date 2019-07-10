package com.sjtu.adminanddealer.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.service.DealerService;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * DealerService对应的实现
 *
 * @author Chuyuxuan
 */
@Service
public class DealerServiceImpl implements DealerService {

    @Value("${imageBaseDirectory}")
    private String imageBaseDirectory;

    @Value("${dealerDefaultAvatarUrl}")
    private String dealerDefaultAvatarUrl;

    private String DEALER_DEFAULT_AVATAR_URL = imageBaseDirectory + dealerDefaultAvatarUrl;
    @Autowired
    private DealerDao dealerDao;

    @Autowired
    private StoreDao storeDao;

    @Override
    public List<DealerDTO> getAllDealers() {
        List<Dealer> dealerList = dealerDao.getAllDealers();
        List<DealerDTO> dtos = new ArrayList<>();
        for (Dealer d : dealerList
        ) {
            DealerDTO dealerDto = new DealerDTO();
            dealerDto.setKey(d.getDealerId());
            dealerDto.setUserName(d.getUserName());
            dealerDto.setAvatar(d.getAvatar());
            dealerDto.setAddress(d.getAddress());
            dealerDto.setRealName(d.getRealName());
            dealerDto.setContact(d.getContact());
            if (d.getStore() != null) {
                dealerDto.setStoreName(d.getStore().getStoreName());
            } else {
                dealerDto.setStoreName(null);
            }
            dealerDto.setPassword(d.getPassword());
            dtos.add(dealerDto);
        }
        return dtos;
    }

    @Override
    public DealerDTO getDealerByDealerId(Long dealerId) {
        Dealer dealer = dealerDao.getDealerById(dealerId);
        if (dealer == null) {
            return new DealerDTO();
        }
        DealerDTO dto = new DealerDTO();
        if (dealer.getStore() != null) {
            dto.setKey(dealer.getDealerId());
            dto.setUserName(dealer.getUserName());
            dto.setAvatar(dealer.getAvatar());
            dto.setAddress(dealer.getAddress());
            dto.setRealName(dealer.getRealName());
            dto.setContact(dealer.getContact());
            dto.setStoreName(dealer.getStore().getStoreName());
            dto.setStoreId(dealer.getStore().getStoreId());
            dto.setPassword(dealer.getPassword());
        } else {
            dto.setKey(dealer.getDealerId());
            dto.setUserName(dealer.getUserName());
            dto.setAvatar(dealer.getAvatar());
            dto.setAddress(dealer.getAddress());
            dto.setRealName(dealer.getRealName());
            dto.setContact(dealer.getContact());
            dto.setPassword(dealer.getPassword());
        }
        return dto;
    }

    @Override
    public JSONObject addADealer(DealerParameter dealerParameter) {
        Dealer dealer = new Dealer();
        dealer.setUserName(dealerParameter.getUserName());
        dealer.setAddress(dealerParameter.getAddress());
        dealer.setContact(dealerParameter.getContact());
        dealer.setPassword(dealerParameter.getPassword());
        dealer.setRealName(dealerParameter.getRealName());
        dealer.setAvatar(this.dealerDefaultAvatarUrl);
        JSONObject jsonObject = new JSONObject();
        Long id = dealerDao.addADealer(dealer);
        jsonObject.put("key",id);
        jsonObject.put("avatar",this.dealerDefaultAvatarUrl);
        return jsonObject;
    }

    @Override
    public void updateDealer(DealerParameter dealerParameter) {
        Dealer dealer = dealerDao.getDealerById(dealerParameter.getKey());
        dealer.setRealName(dealerParameter.getRealName());
        dealer.setPassword(dealerParameter.getPassword());
        dealer.setContact(dealerParameter.getContact());
        dealer.setAddress(dealerParameter.getAddress());
        dealer.setUserName(dealerParameter.getUserName());
        storeDao.bindDealerStore(dealerParameter.getKey(), dealerParameter.getStoreId());
        dealerDao.updateDealer(dealer);
    }

    @Override
    public void deleteDealer(Long dealerId) {
        dealerDao.deleteDealer(dealerId);
    }

    @Override
    public List<StoreDTO> getAllUnbindStore() {
        List<Store> storeArrayList = dealerDao.getAllUnbindStore();
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
            String[] hours = {startHour, endHour};
            storeDTO.setHours(hours);

            storeDTOList.add(storeDTO);

        }
        return storeDTOList;
    }

    @Override
    public void updateDealerPassword(String password) {
        // TODO: 经销商密码修改实现
    }

    @Override
    public String updateDealerAvatar(MultipartFile file, Long dealerId, String avatar) {
        if(avatar.equals(this.dealerDefaultAvatarUrl)){
            String newAvatar = FileUploadUtil.getFileUploadUtil().saveFile(file);
            dealerDao.updateDealerAvatar(dealerId, newAvatar);
            return newAvatar;
        } else {
            String newAvatar = FileUploadUtil.getFileUploadUtil().saveFile(file);
            dealerDao.updateDealerAvatar(dealerId, newAvatar);
            // 把原来存在的文件删除
            FileUploadUtil.getFileUploadUtil().deleteFile(avatar);
            return newAvatar;
        }
    }

}
