package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;

public interface OrderInfoRepository extends CrudRepository<OrderInfo, Long> {

    OrderInfo getOrderInfoByOrderInfoId(Long orderInfoId);

}
