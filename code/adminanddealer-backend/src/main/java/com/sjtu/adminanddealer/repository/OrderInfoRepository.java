package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface OrderInfoRepository extends CrudRepository<OrderInfo, Long> {

    OrderInfo getOrderInfoByOrderInfoId(Long orderInfoId);

    List<OrderInfo> getOrderInfosByStoreIdAndCreateDateBetween(Long storeId, Date start, Date end);

}
