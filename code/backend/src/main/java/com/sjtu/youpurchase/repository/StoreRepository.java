package com.sjtu.youpurchase.repository;

import com.sjtu.youpurchase.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Chuyuxuan
 */
public interface StoreRepository extends JpaRepository<Store, Long> {
}
