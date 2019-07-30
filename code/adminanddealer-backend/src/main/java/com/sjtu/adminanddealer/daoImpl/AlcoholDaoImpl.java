package com.sjtu.adminanddealer.daoImpl;

import com.sjtu.adminanddealer.dao.AlcoholDao;
import com.sjtu.adminanddealer.entity.Alcohol;
import com.sjtu.adminanddealer.repository.AlcoholRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 数据访问层实现
 */
@Repository
public class AlcoholDaoImpl implements AlcoholDao {

    @Autowired
    private AlcoholRepository alcoholRepository;

    @Override
    public List<Alcohol> getAllAlcohol() {
        return alcoholRepository.findAll();
    }

    @Override
    public Alcohol getById(Long alcoholId) {
        return alcoholRepository.getAlcoholByAlcoholId(alcoholId);
    }

    @Override
    public void update(Alcohol alcohol) {
        alcoholRepository.saveAndFlush(alcohol);
    }

    @Override
    public Long add(Alcohol alcohol) {
        alcoholRepository.saveAndFlush(alcohol);
        return alcohol.getAlcoholId();
    }

    @Override
    public void deleteById(Long alcoholId) {
        alcoholRepository.deleteById(alcoholId);
    }
}
