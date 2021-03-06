package com.you_purchase.backenduser.service;

import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.entity.DeliveryAddress;
import com.you_purchase.backenduser.entity.OrderInfo;
import com.you_purchase.backenduser.entity.Store;
import com.you_purchase.backenduser.parameter.DeliveryAddressParameter;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 配送地址逻辑
 *
 * @author Chuyuxuan
 */
@Service
public class DeliveryAddressService extends BaseService {

    public List<DeliveryAddress> getDeliveryAddressByuserId(Long userId){
        List<DeliveryAddress> addresses = new ArrayList<>();
        for (DeliveryAddress i:deliveryAddressDao.getDeliveryAddressesByUserId(userId)
             ) {
            if(!i.isDeleted()){
                addresses.add(i);
            }
        }
        return addresses;
    }

    public DeliveryAddress getDeliveryAddress(Long deliveryAddressId){
        if(deliveryAddressDao.existsById(deliveryAddressId)){
            return deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(deliveryAddressId);
        }
        return null;
    }

    public void addAddress(DeliveryAddressParameter address){
        DeliveryAddress deliveryAddress = new DeliveryAddress(address.getUserId(), address.getName(),address.getGender(),address.getContact(),
                address.getAddress(),address.getLatitude(),address.getLongitude(),address.getDetailAddress(),address.getTag(), false);
        deliveryAddress.setUserId(address.getUserId());

        deliveryAddressDao.save(deliveryAddress);
    }

    public void updateAddress(DeliveryAddressParameter parameter){
        DeliveryAddress address = deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(parameter.getDeliveryAddressId());
        if(address!=null) {
            address.setName(parameter.getName());
            address.setContact(parameter.getContact());
            address.setGender(parameter.getGender());
            address.setAddress(parameter.getAddress());
            address.setLatitude(parameter.getLatitude());
            address.setLongitude(parameter.getLongitude());
            address.setDetailAddress(parameter.getDetailAddress());
            address.setTag(parameter.getTag());
            deliveryAddressDao.save(address);
        }
    }

    public void deleteAddress(Long deliveryAddressId){
        if(deliveryAddressDao.existsById(deliveryAddressId)){
            DeliveryAddress address = deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(deliveryAddressId);
            address.setDeleted(true);
            deliveryAddressDao.save(address);
        }
    }

    @RabbitHandler
    @RabbitListener(queuesToDeclare = @Queue("pay"))
    public void thirdDeliveryAfterPay(Long orderInfoId){
        OrderInfo orderInfo = orderInfoDao.findByOrderInfoIdAndValid(orderInfoId, true);
        if(orderInfo!=null){
            Store store = storeDao.findByStoreId(orderInfo.getStoreId());
            // 如果商家的配送方式是蜂鸟配送，调用配送接口
            if (store.getDeliveryType().equals(1)){
                DeliveryAddress address = deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(orderInfo.getDeliveryAddressId());
                JSONObject json = new JSONObject();
                json.put("partner_order_code", orderInfoId);
                json.put("notify_url", "http://202.120.40.8:30413/delivery");
                json.put("receiver_name", orderInfo.getTarPeople());
                json.put("receiver_phone", orderInfo.getTarPhone());
                json.put("receiver_address", orderInfo.getTarAddress());
                json.put("receiver_longitude", address.getLongitude());
                json.put("receiver_latitude", address.getLatitude());
                json.put("transport_name", store.getStoreName());
                json.put("transport_address", store.getAddress());
                json.put("transport_tel", store.getContact());
                json.put("transport_longitude", store.getLongitude());
                json.put("transport_latitude", store.getLatitude());
                String postUrl = "http://202.120.40.8:30417/order";
                ResponseEntity<JSONObject> response = restTemplate.postForEntity(postUrl, json, JSONObject.class);
                orderInfo.setStatus(2);
                orderInfoDao.save(orderInfo);
                }
            } else {
            // TODO 商家的配送方式是自己配送，直接修改订单状态
        }

    }
}
