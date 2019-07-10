package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.Dealer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *
 * @author Chuyuxuan
 */
@Transactional
public interface DealerRepository extends JpaRepository<Dealer, Long> {

    Dealer getByDealerId(Long Id);

    Dealer getDealerByUserNameAndPassword(String userName, String Password);

    List<Dealer> getByAttachedIsFalse();

    @Modifying
    @Query(value = "update `dealer` set `avatar` = :avatar where `dealer_id` = :dealerId ", nativeQuery = true)
    void updateDealerAvatar(@Param("dealerId") Long dealerId, @Param("avatar") String avatar);
}
