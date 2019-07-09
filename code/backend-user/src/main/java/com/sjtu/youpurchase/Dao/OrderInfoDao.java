package com.sjtu.youpurchase.Dao;



import com.sjtu.youpurchase.DTO.OrderCheckDTO;
import com.sjtu.youpurchase.entity.OrderInfo;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface OrderInfoDao extends CrudRepository<OrderInfo,String> {
    //用户查询订单
    public List<OrderCheckDTO> findByUserIdAndValid(long userId,boolean valid);
    //店家查询订单
    public List<OrderCheckDTO> findByStoreNameAndValid(String storeName,boolean valid);
    // 直接查看订单
    public OrderInfo findByOrderInfoIdAndValid(long orderInfoId,boolean valid);
}
