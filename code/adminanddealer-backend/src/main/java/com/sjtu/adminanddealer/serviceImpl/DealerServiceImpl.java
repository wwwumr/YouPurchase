package com.sjtu.adminanddealer.serviceImpl;

import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import com.sjtu.adminanddealer.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
    private static String imageBaseDirectory;
    @Value("${dealerDefaultAvatarUrl}")
    private static String dealerDefaultAvatarUrl;
    // TODO: 添加经销商默认头像uri
    private static String DEALER_DEFAULT_AVATAR_URL = imageBaseDirectory + dealerDefaultAvatarUrl;
    @Autowired
    private DealerDao dealerDao;

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
            dealerDto.setStoreName(d.getStore().getStoreName());
            dealerDto.setPassword(d.getPassword());
            dtos.add(dealerDto);
        }
        return dtos;
    }

    @Override
    public void addADealer(DealerParameter dealerParameter) {
        Dealer dealer = new Dealer();
        dealer.setUserName(dealerParameter.getUserName());
        dealer.setAddress(dealerParameter.getAddress());
        dealer.setContact(dealerParameter.getContact());
        dealer.setPassword(dealerParameter.getPassword());
        dealer.setRealName(dealerParameter.getRealName());
        dealer.setAvatar(DEALER_DEFAULT_AVATAR_URL);
        dealer.setStore(new Store());

        dealerDao.addADealer(dealer);
    }

    @Override
    public void updateDealer(DealerParameter dealerParameter) {
        Dealer dealer = dealerDao.getDealerById(dealerParameter.getKey());
        dealer.setRealName(dealerParameter.getRealName());
        dealer.setPassword(dealerParameter.getPassword());
        dealer.setContact(dealerParameter.getContact());
        dealer.setAddress(dealerParameter.getAddress());
        dealer.setUserName(dealerParameter.getUserName());

        dealerDao.updateDealer(dealer);
    }

    @Override
    public void updateDealerPassword(String password) {

    }

}
