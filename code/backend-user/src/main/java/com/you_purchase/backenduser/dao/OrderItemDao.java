package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.dto.OrderListDTO;
import com.you_purchase.backenduser.entity.OrderItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemDao extends CrudRepository<OrderItem,String> {
    public List<OrderListDTO> findByOrderInfoId(long orderInfoId);
}
