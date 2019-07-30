package com.sjtu.adminanddealer.serviceImpl;

import com.sjtu.adminanddealer.dao.AlcoholDao;
import com.sjtu.adminanddealer.entity.Alcohol;
import com.sjtu.adminanddealer.parameter.NewAlcoholParameter;
import com.sjtu.adminanddealer.service.AlcoholService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlcoholServiceImpl implements AlcoholService {

    @Autowired
    private AlcoholDao alcoholDao;

    @Value("${alcoholDefaultCoverPicUrl}")
    private String DEFAULT_PIC;

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
        Alcohol alcohol = new Alcohol();
        alcohol.setAlcoholInfo(parameter.getAlcoholInfo());
        alcohol.setAvailable(true);
        alcohol.setCoverPicUrl(DEFAULT_PIC);
        return alcoholDao.add(alcohol);
    }

//    @Override
//    public void update(NewAlcoholParameter parameter) {
//        Alcohol
//    }

    @Override
    public void deleteById(Long alcoholId) {
        alcoholDao.deleteById(alcoholId);
    }
}
