package com.sjtu.adminanddealer.serviceImpl;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.CommodityDTO;
import com.sjtu.adminanddealer.DTO.CommodityShortageDTO;
import com.sjtu.adminanddealer.dao.CommodityDao;
import com.sjtu.adminanddealer.dao.StoreDao;
import com.sjtu.adminanddealer.entity.Commodity;
import com.sjtu.adminanddealer.entity.Store;
import com.sjtu.adminanddealer.parameter.CommodityCheckParameter;
import com.sjtu.adminanddealer.parameter.CommodityParameter;
import com.sjtu.adminanddealer.service.CommodityService;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private StoreDao storeDao;

    @Value("${commodityDefaultCoverPicUrl}")
    private String DEFAULT_COMMODITY_COVER;

    @Autowired
    private FileUploadUtil fileUploadUtil;

    @Override
    public List<CommodityDTO> getAllCommoditiesByStore(Long storeId) {
        List<Commodity> commodityList = commodityDao.getAllCommodityByStore(storeId);
        List<CommodityDTO> commodityDTOS = new ArrayList<>();
        if (commodityList == null) {
            return commodityDTOS;
        }
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
    public JSONObject addACommodity(CommodityParameter commodityParameter, Long storeId) {
        JSONObject json = new JSONObject();
        if(storeId!=null){
            Commodity commodity = new Commodity();
            commodity.setCommodityInfo(commodityParameter.getCommodityInfo());
            commodity.setInventory(commodityParameter.getInventory());
            commodity.setOnShelves(false);
            commodity.setPrice(commodityParameter.getPrice());
            commodity.setRemaining(commodityParameter.getRemaining());
            commodity.setCommodityCoverPicUrl(this.DEFAULT_COMMODITY_COVER);
            Long newId = commodityDao.addCommodity(commodity, storeId);

            json.put("key", newId);
            json.put("coverPicUrl", this.DEFAULT_COMMODITY_COVER);
            return json;
        }
        json.put("key", null);
        json.put("coverPicUrl", null);
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

    @Override
    public void deleteCommodities(List<Long> commodityIds, Long storeId) {
        if(storeId==null){
            return;
        }
        Store store = storeDao.getStoreByStoreId(storeId);
        for (Long id:commodityIds
             ) {
            commodityDao.deleteCommodity(id);
            store.getCommodityList().remove(commodityDao.getCommodityById(id));
        }
        storeDao.updateStore(store);
    }

    @Override
    public List<CommodityShortageDTO> checkCommodityRemaining(List<CommodityCheckParameter> checkParameterList) {
        List<CommodityShortageDTO> dtos = new ArrayList<>();
        for (CommodityCheckParameter c : checkParameterList
        ) {
            Commodity commodity = commodityDao.getCommodityById(c.getCommodityId());
            // 当商品余量不足时，加入list
            if (commodity != null && commodity.getRemaining() < c.getDemandAmount()) {
                dtos.add(new CommodityShortageDTO(c.getCommodityId(), commodity.getRemaining()));
            }
        }
        return dtos;
    }

    @Override
    public List<CommodityShortageDTO> decreaseCommodityInventory(List<CommodityCheckParameter> commodityList) {
        List<CommodityShortageDTO> dtos = new ArrayList<>();
        for (CommodityCheckParameter c : commodityList
        ) {
            Commodity commodity = commodityDao.getCommodityById(c.getCommodityId());
            if (commodity == null) {
                continue;
            }
            // 当商品余量不足时，加入list
            if (commodity.getRemaining() < c.getDemandAmount()) {
                dtos.add(new CommodityShortageDTO(c.getCommodityId(), commodity.getRemaining()));
            }
            commodity.setRemaining(commodity.getRemaining() - c.getDemandAmount());
            commodity.setInventory(commodity.getInventory() - c.getDemandAmount());
            commodityDao.updateCommodity(commodity);
        }
        return dtos;
    }

    @Override
    public String updateCommodityCoverPic(MultipartFile file, Long commodityId, String coverPicUrl) {
        if (coverPicUrl.equals(this.DEFAULT_COMMODITY_COVER)) {
            String newUrl = fileUploadUtil.saveFile(file);
            commodityDao.updateCommodityCoverPic(newUrl, commodityId);
            return newUrl;
        } else {
            String newUrl = fileUploadUtil.saveFile(file);
            commodityDao.updateCommodityCoverPic(newUrl, commodityId);
            // 把原来存在的文件删除
            int i = fileUploadUtil.deleteFile(coverPicUrl);
            /// debug
//            System.out.println(i);
            return newUrl;
        }
    }

    @Override
    public String addCommodityPics(MultipartFile file, Long commodityId) {
        String newPicUrl = fileUploadUtil.saveFile(file);
        Commodity commodity = commodityDao.getCommodityById(commodityId);
        commodity.getCommodityPicUrls().add(newPicUrl);
        commodityDao.updateCommodity(commodity);
        return newPicUrl;
    }
}
