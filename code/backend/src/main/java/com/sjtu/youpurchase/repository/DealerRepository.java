package com.sjtu.youpurchase.repository;

import com.sjtu.youpurchase.entity.Dealer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealerRepository extends JpaRepository<Dealer, Long> {

    Dealer getByDealerId(Long Id);
}
