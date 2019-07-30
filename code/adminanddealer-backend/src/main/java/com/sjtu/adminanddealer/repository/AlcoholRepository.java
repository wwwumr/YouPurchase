package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Alcohol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlcoholRepository extends JpaRepository<Alcohol, Long> {

    Alcohol getAlcoholByAlcoholId(Long alcoholId);


}
