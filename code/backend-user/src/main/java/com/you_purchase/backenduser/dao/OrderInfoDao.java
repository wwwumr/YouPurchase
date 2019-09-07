package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.function.BinaryOperator;


public interface OrderInfoDao extends CrudRepository<OrderInfo,String> {
    //查找特定的订单
    public OrderInfo findByOrderInfoIdAndValid(long orderInfoId,boolean valid);
    //用户查询各种执行状态的订单
    public List<OrderInfo> findByUserIdAndStatusAndValid(long userId,int status,boolean valid);
    //用户查看所有订单
    public List<OrderInfo> findByUserIdAndValid(long userId, boolean valid);
    //商家查看所有订单
    public  List<OrderInfo> findByStoreIdAndValid(long storeId,boolean valid);
    //商家查看各种状态订单
    public List<OrderInfo> findByStoreIdAndStatusAndValid(long storeId,int status,boolean valid);
    //商家查询某时间段的
   public List<OrderInfo> findByStoreIdAndCreateDateIsGreaterThanEqualAndCreateDateIsLessThanEqual(
           long storeId,Date start,Date end);


}
