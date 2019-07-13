package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


/*
* 访问方法
* */

public interface OrderInfoDao extends CrudRepository<OrderInfo,String> {
    //查找特定的订单
    public OrderInfo findByOrderInfoIdAndValid(long orderInfoId,boolean valid);
    //商家查找各种执行状态的订单
    public List<OrderInfo> findByStoreIdAndStatusAndValid(long storeId,int status,boolean valid);
    //用户查询各种执行状态的订单
    public List<OrderInfo> findByUserIdAndStatusAndValid(long userId,int status,boolean valid);

}
