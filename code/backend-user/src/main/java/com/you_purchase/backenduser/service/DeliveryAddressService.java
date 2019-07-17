package com.you_purchase.backenduser.service;

import com.you_purchase.backenduser.entity.DeliveryAddress;
import com.you_purchase.backenduser.parameter.DeliveryAddressParameter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAddressService extends BaseService {

    public List<DeliveryAddress> getDeliveryAddressByuserId(Long userId){
        return deliveryAddressDao.getDeliveryAddressesByUserId(userId);
    }

    public DeliveryAddress getDeliveryAddress(Long deliveryAddressId){
        if(deliveryAddressDao.existsById(deliveryAddressId)){
            return deliveryAddressDao.getDeliveryAddressesByDeliveryAddressId(deliveryAddressId);
        }
        return null;
    }

    public void addAddress(DeliveryAddressParameter address){
        DeliveryAddress deliveryAddress = new DeliveryAddress(address.getName(),address.getGender(),address.getContact(),
                address.getAddress(),address.getLatitude(),address.getLongitude(),address.getDetailAddress(),address.getTag());
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
            deliveryAddressDao.deleteById(deliveryAddressId);
        }
    }
}
