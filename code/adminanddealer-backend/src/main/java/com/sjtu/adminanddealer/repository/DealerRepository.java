package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Dealer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealerRepository extends JpaRepository<Dealer, Long> {

    Dealer getByDealerId(Long Id);

    Dealer getDealerByUserNameAndPassword(String userName, String Password);

    List<Dealer> getByAttachedIsFalse();
}
