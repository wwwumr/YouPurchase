package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.DeliveryAddress;
import com.you_purchase.backenduser.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DeliveryAddressDao extends CrudRepository<DeliveryAddress, Long> {
    List<DeliveryAddress> getDeliveryAddressesByUserId(Long userId);

    DeliveryAddress getDeliveryAddressesByDeliveryAddressId(Long Id);
}
