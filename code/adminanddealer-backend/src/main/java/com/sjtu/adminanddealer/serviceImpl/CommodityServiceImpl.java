package com.sjtu.adminanddealer.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.dao.CommodityDao;
import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.parameter.CommodityParameter;
import com.sjtu.adminanddealer.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${commodityDefaultCoverPicUrl}")
    private String DEFAULT_COMMODITY_COVER;

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
    public JSONObject addACommodity(CommodityParameter commodityParameter) {
        Commodity commodity = new Commodity();
        commodity.setCommodityInfo(commodityParameter.getCommodityInfo());
        commodity.setInventory(commodityParameter.getInventory());
        commodity.setOnShelves(false);
        commodity.setPrice(commodityParameter.getPrice());
        commodity.setRemaining(commodityParameter.getRemaining());
        commodity.setCommodityCoverPicUrl(this.DEFAULT_COMMODITY_COVER);
        Long newId = commodityDao.addCommodity(commodity);

        JSONObject json = new JSONObject();
        json.put("key", newId);
        json.put("coverPicUrl", this.DEFAULT_COMMODITY_COVER);
        return json;
    }

    @Override
    public void updateACommodity(CommodityParameter commodityParameter) {
        Commodity commodity = commodityDao.getCommodityById(commodityParameter.getKey());
        commodity.setPrice(commodityParameter.getPrice());
        commodity.setCommodityInfo(commodityParameter.getCommodityInfo());
        commodity.setOnShelves(commodityParameter.isOnShelves());
        commodity.setInventory(commodityParameter.getInventory());
        commodity.setRemaining(commodityParameter.getRemaining());

        commodityDao.updateCommodity(commodity);
    }

    @Override
    public void deleteCommodity(Long commodityId) {
        commodityDao.deleteCommodity(commodityId);
    }
}
