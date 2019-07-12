package com.you_purchase.backenduser.service;


import com.you_purchase.backenduser.dto.OrderInfoDTO;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.Store;
import com.you_purchase.backenduser.entity.User;
import com.you_purchase.backenduser.parameter.OrderInfoCheckParameter;
import com.you_purchase.backenduser.parameter.OrderInfoParameter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderInfoService extends BaseService {
    //用户新增订单
    public int addOrder(OrderInfoParameter orderInfoParameter){
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderInfo(orderInfoParameter);
        orderInfoDao.save(orderInfo);
        return 200;
    }

    //用户查看不同执行状态的订单
    public List<OrderInfoDTO> OrderUserCheck(OrderInfoCheckParameter orderInfoCheckParameter){
        List<OrderInfo> orderInfos = orderInfoDao.findByUserIdAndStatusAndValid(orderInfoCheckParameter.getId(),orderInfoCheckParameter.getStatus(),true);
        if(orderInfos == null){
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = new ArrayList<>();
        for(OrderInfo s: orderInfos){
            OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
            orderInfoDTO.setOrderInfoId(s.getOrderInfoId());
            orderInfoDTO.setTotalPrice(s.getTotalPrice());
            orderInfoDTO.setCreateDate(s.getCreateDate());
            //获取店铺名称
            Store store = storeDao.findByStoreId(s.getStoreId());
            orderInfoDTO.setStoreName(store.getStoreName());
            //获取用户名称
            User user = userDao.findByUserId(s.getUserId());
            orderInfoDTO.setUserName(user.getUserName());
            orderInfoDTOS.add(orderInfoDTO);
        }
        return orderInfoDTOS;
    }

    //店家查看不同执行状态的订单
    public List<OrderInfoDTO> OrderStoreCheck(OrderInfoCheckParameter orderInfoCheckParameter){
        List<OrderInfo> orderInfos = orderInfoDao.findByStoreIdAndStatusAndValid(orderInfoCheckParameter.getId(),orderInfoCheckParameter.getStatus(),true);
        if(orderInfos == null){
            return null;
        }
        List<OrderInfoDTO> orderInfoDTOS = new ArrayList<>();
        for(OrderInfo s:orderInfos){
            OrderInfoDTO orderInfoDTO = new OrderInfoDTO();
            orderInfoDTO.setCreateDate(s.getCreateDate());
            orderInfoDTO.setTotalPrice(s.getTotalPrice());
            orderInfoDTO.setOrderInfoId(s.getOrderInfoId());
            Store store = storeDao.findByStoreId(s.getStoreId());
            User user = userDao.findByUserId(s.getUserId());
            orderInfoDTO.setUserName(user.getUserName());
            orderInfoDTO.setStoreName(store.getStoreName());
            orderInfoDTOS.add(orderInfoDTO);
        }
        return orderInfoDTOS;
    }

    //店家修改订单执行状态
    public int OrderInfoModify(long orderInfoId,int status){
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId,true);
        if(orderInfo == null){
            return 403;
        }
        orderInfo.setStatus(status);
        orderInfoDao.save(orderInfo);
        return 200;
    }
    //取消订单
    public int OrderInfoDelete(long orderInfoId){
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId,true);
        if(orderInfo == null){
            return 403;
        }
        orderInfo.setValid(false);
        return 200;
    }
}
