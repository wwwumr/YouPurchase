package com.sjtu.adminanddealer.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.service.DealerService;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import com.sjtu.adminanddealer.utils.Md5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private DealerDao dealerDao;

    @Autowired
    private StoreDao storeDao;

    @Autowired
    private FileUploadUtil fileUploadUtil;

    @Override
    public List<DealerDTO> getAllDealers() {
        List<Dealer> dealerList = dealerDao.getAllDealers();
        List<DealerDTO> dtos = new ArrayList<>();
        for (Dealer d : dealerList
        ) {
            DealerDTO dealerDto = new DealerDTO(d);
            dtos.add(dealerDto);
        }
        return dtos;
    }

    @Override
    public DealerDTO getDealerByDealerId(Long dealerId) {
        Dealer dealer = dealerDao.getDealerById(dealerId);
        if (dealer == null) {
            return null;
        }
        DealerDTO dto = new DealerDTO(dealer);
        return dto;
    }

    @Override
    public JSONObject addADealer(DealerParameter dealerParameter) {
        JSONObject jsonObject = new JSONObject();
        if (dealerDao.existByUserName(dealerParameter.getUserName())) {
            jsonObject.put("key", -1);
            return jsonObject;
        }
        Dealer dealer = new Dealer();
        dealer.setUserName(dealerParameter.getUserName());
        dealer.setGender(dealerParameter.getGender());
        dealer.setBirthday(dealerParameter.getBirthday());
        dealer.setContact(dealerParameter.getContact());
        dealer.setRealName(dealerParameter.getRealName());
        dealer.setAvatar(this.dealerDefaultAvatarUrl);
        dealer.setPassword(Md5Util.encode(dealerParameter.getPassword()));
        Long id = dealerDao.addADealer(dealer);
        jsonObject.put("key", id);
        jsonObject.put("avatar", this.dealerDefaultAvatarUrl);
        return jsonObject;
    }

    @Override
    public void updateDealer(DealerParameter dealerParameter) {
        Dealer dealer = dealerDao.getDealerById(dealerParameter.getKey());
        dealer.setRealName(dealerParameter.getRealName());
        dealer.setContact(dealerParameter.getContact());
        dealer.setGender(dealerParameter.getGender());
        dealer.setBirthday(dealerParameter.getBirthday());
        dealer.setUserName(dealerParameter.getUserName());
        storeDao.bindDealerStore(dealerParameter.getKey(), dealerParameter.getStoreId());
        dealerDao.updateDealer(dealer);
    }

    @Override
    public void deleteDealer(Long dealerId) {
        dealerDao.deleteDealer(dealerId);
    }

    @Override
    public List<DealerDTO> getAllUnbindDealers() {
        List<Dealer> dealerList = dealerDao.getAllUnbindDealers();
        List<DealerDTO> dtos = new ArrayList<>();
        for (Dealer d : dealerList
        ) {
            DealerDTO dealerDto = new DealerDTO(d);
            dtos.add(dealerDto);
        }
        return dtos;
    }

    @Override
    public Integer updateDealerPassword(Long dealerId, String oldPassword, String newPassword) {
        Dealer dealer = dealerDao.getDealerById(dealerId);
        if (dealer == null) {
            return 400;
        }
        if (dealer.getPassword().equals(Md5Util.encode(oldPassword))) {
            dealer.setPassword(Md5Util.encode(newPassword));
            dealerDao.updateDealer(dealer);
            return 200;
        } else {
            return 300;
        }
    }

    @Override
    public Integer updateDealerPasswordByAdmin(Long dealerId, String newPassword) {
        Dealer dealer = dealerDao.getDealerById(dealerId);
        if (dealer == null) {
            return 400;
        }
        dealer.setPassword(Md5Util.encode(newPassword));
        dealerDao.updateDealer(dealer);
        return 200;
    }

    @Override
    public String updateDealerAvatar(MultipartFile file, Long dealerId, String avatar) {
        if (avatar.equals(this.dealerDefaultAvatarUrl)) {
            String newAvatar = fileUploadUtil.saveFile(file);
            dealerDao.updateDealerAvatar(dealerId, newAvatar);
            return newAvatar;
        } else {
            String newAvatar = fileUploadUtil.saveFile(file);
            dealerDao.updateDealerAvatar(dealerId, newAvatar);
            // 把原来存在的文件删除
            fileUploadUtil.deleteFile(avatar);
            return newAvatar;
        }
    }

}
