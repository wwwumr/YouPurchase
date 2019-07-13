package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.OrderItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemDao extends CrudRepository<OrderItem,String> {
    public List<OrderItem> findByOrderInfo(long orderInfoId);
}
