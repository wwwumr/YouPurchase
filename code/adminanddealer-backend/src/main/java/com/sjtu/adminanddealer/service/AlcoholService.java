package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.entity.Alcohol;
import com.sjtu.adminanddealer.parameter.NewAlcoholParameter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AlcoholService {

    Alcohol getById(Long alcoholId);

    List<Alcohol> getAll();

    Long add(NewAlcoholParameter parameter);

    void update(NewAlcoholParameter parameter);

    void deleteById(Long alcoholId);

    String updateAlcoholCoverPic(MultipartFile file, Long alcoholId, String coverPicUrl);
}
