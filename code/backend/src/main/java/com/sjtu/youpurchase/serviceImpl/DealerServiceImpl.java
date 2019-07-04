package com.sjtu.youpurchase.serviceImpl;

import com.sjtu.youpurchase.DTO.DealerRequestDTO;
import com.sjtu.youpurchase.DTO.DealerResponseDTO;
import com.sjtu.youpurchase.dao.DealerDao;
import com.sjtu.youpurchase.entity.Dealer;
import com.sjtu.youpurchase.entity.Store;
import com.sjtu.youpurchase.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private DealerDao dealerDao;

    @Override
    public List<DealerResponseDTO> getAllDealers() {
        List<Dealer> dealerList = dealerDao.getAllDealers();
        List<DealerResponseDTO> dtos = new ArrayList<>();
        for (Dealer d : dealerList
        ) {
            DealerResponseDTO dealerDto = new DealerResponseDTO();
            dealerDto.setKey(d.getDealerId());
            dealerDto.setUserName(d.getUserName());
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
    public void addADealer(DealerRequestDTO dealerRequestDTO) {
        Dealer dealer = new Dealer();
        dealer.setUserName(dealerRequestDTO.getUserName());
        dealer.setAddress(dealerRequestDTO.getAddress());
        dealer.setContact(dealerRequestDTO.getContact());
        dealer.setPassword(dealerRequestDTO.getPassword());
        dealer.setRealName(dealerRequestDTO.getRealName());
        dealer.setStore(new Store());

        dealerDao.addADealer(dealer);
    }

    @Override
    public void updateDealer(DealerRequestDTO dealerRequestDTO) {
        Dealer dealer = dealerDao.getDealerById(dealerRequestDTO.getKey());
        dealer.setRealName(dealerRequestDTO.getRealName());
        dealer.setPassword(dealerRequestDTO.getPassword());
        dealer.setContact(dealerRequestDTO.getContact());
        dealer.setAddress(dealerRequestDTO.getAddress());
        dealer.setUserName(dealerRequestDTO.getUserName());

        dealerDao.updateDealer(dealer);
    }
}
