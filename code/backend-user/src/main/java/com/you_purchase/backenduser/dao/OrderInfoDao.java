package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderInfoDao extends CrudRepository<OrderInfo,String> {
    //store 查看不同执行状态的订单
    public List<OrderInfo> findByStoreIdAndStatusAndValid(long storeId,int status,boolean valid);
    //用户查看不同状态的订单
    public List<OrderInfo> findByUserIdAndStatusAndValid(long userId,int status,boolean valid);
    //查找特定订单
    public OrderInfo findByOrderInfoIdAndValid(long orderInfoId,boolean valid);
}
