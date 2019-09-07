package com.sjtu.adminanddealer.serviceImpl;

import com.sjtu.adminanddealer.dao.AlcoholDao;
import com.sjtu.adminanddealer.entity.Alcohol;
import com.sjtu.adminanddealer.parameter.NewAlcoholParameter;
import com.sjtu.adminanddealer.service.AlcoholService;
import com.sjtu.adminanddealer.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AlcoholServiceImpl implements AlcoholService {

    @Autowired
    private AlcoholDao alcoholDao;

    @Autowired
    private FileUploadUtil fileUploadUtil;

    @Value("${alcoholDefaultCoverPicUrl}")
    private String DEFAULT_ALCOHOL_PIC;

    @Override
    public Alcohol getById(Long alcoholId) {
        return alcoholDao.getById(alcoholId);
    }

    @Override
    public List<Alcohol> getAll() {
        return alcoholDao.getAllAlcohol();
    }

    @Override
    public Long add(NewAlcoholParameter parameter) {
        Alcohol alcohol = new Alcohol(parameter.getAlcoholInfo(), parameter.getRemaining(), parameter.getPrice(), DEFAULT_ALCOHOL_PIC);
        return alcoholDao.add(alcohol);
    }

    @Override
    public void update(NewAlcoholParameter parameter) {
        Alcohol alcohol = alcoholDao.getById(parameter.getAlcoholId());
        alcohol.setAlcoholInfo(parameter.getAlcoholInfo());
        alcohol.setPrice(parameter.getPrice());
        alcohol.setRemaining(parameter.getRemaining());
        alcoholDao.update(alcohol);
    }

    @Override
    public void deleteById(Long alcoholId) {
        alcoholDao.deleteById(alcoholId);
    }

    @Override
    public String updateAlcoholCoverPic(MultipartFile file, Long alcoholId, String coverPicUrl) {
        if (coverPicUrl.equals(this.DEFAULT_ALCOHOL_PIC)) {
            String newUrl = fileUploadUtil.saveFile(file);
            alcoholDao.updateAlcoholCover(newUrl, alcoholId);
            return newUrl;
        } else {
            String newUrl = fileUploadUtil.saveFile(file);
            alcoholDao.updateAlcoholCover(newUrl, alcoholId);
            fileUploadUtil.deleteFile(coverPicUrl);
            return newUrl;
        }
    }
}
