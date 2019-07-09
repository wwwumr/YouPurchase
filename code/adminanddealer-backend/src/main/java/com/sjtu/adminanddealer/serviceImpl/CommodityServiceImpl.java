package com.sjtu.adminanddealer.serviceImpl;

import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.dao.CommodityDao;
import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.parameter.CommodityParameter;
import com.sjtu.adminanddealer.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 接口CommodityService的实现类.
 *
 * @author Chuyuxuan
 */
@Service
public class CommodityServiceImpl implements CommodityService {

    @Autowired
    private CommodityDao commodityDao;

    @Override
    public List<CommodityDTO> getAllCommoditiesByStore(Long storeId) {
        List<Commodity> commodityList = commodityDao.getAllCommodityByStore(storeId);
        List<CommodityDTO> commodityDTOS = new ArrayList<>();
        for (Commodity c : commodityList
        ) {
            CommodityDTO dto = new CommodityDTO(c);
            commodityDTOS.add(dto);
        }
        return commodityDTOS;
    }

    @Override
    public CommodityDTO getCommodityById(Long commodityId) {
        Commodity commodity = commodityDao.getCommodityById(commodityId);
        if (commodity != null) {
            CommodityDTO dto = new CommodityDTO(commodity);
            return dto;
        }
        return null;
    }

    @Override
    public void addACommodity(CommodityParameter commodityParameter) {
// TODO: 添加商品
    }

    @Override
    public void updateACommodity(CommodityParameter commodityParameter) {
// TODO: 修改商品
    }
}
