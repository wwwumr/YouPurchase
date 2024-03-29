package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.entity.DeliveryAddress;
import com.you_purchase.backenduser.parameter.DeliveryAddressParameter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 对用户的收货地址进行管理的controller
 *
 * @author Chuyuxuan
 */
@RestController
@RequestMapping("/delivery")
public class DeliveryAddressController extends BaseController {

    /**
     * 获取用户的全部收货地址
     * @param userId 用户id
     * @return 所有收货地址的列表
     */
    @GetMapping("/address")
    public List<DeliveryAddress> getAllAddressByUser(@RequestParam("userId")Long userId){
        return deliveryAddressService.getDeliveryAddressByuserId(userId);
    }

    /**
     * 用户新增收货地址
     * @param parameter 前端发送的数据
     * @return SAVED
     */
    @PostMapping("/address")
    public String addNewAddress(@RequestBody DeliveryAddressParameter parameter){
        deliveryAddressService.addAddress(parameter);
        return "SAVED";
    }

    /**
     * 用户修改收货地址
     * @param parameter 前端发送的数据
     * @return UPDATE
     */
    @PutMapping("/address")
    public String updateAddress(@RequestBody DeliveryAddressParameter parameter){
        deliveryAddressService.updateAddress(parameter);
        return "UPDATE";
    }

    /**
     * 用户删除收货地址
     * @param deliveryAddressId 需要删除的id
     * @return DELETE
     */
    @DeleteMapping("/address")
    public String deleteAddress(@RequestParam Long deliveryAddressId){
        deliveryAddressService.deleteAddress(deliveryAddressId);
        return "DELETE";
    }

    @GetMapping
    public String createDeliveryOrderCallback(@RequestParam("orderId")Long orderId){
        System.out.println("create order callback, orderId:"+orderId);
        orderInfoService.OrderInfoModify(orderId, 2);
        return "ORDER_ON_DELIVERY";
    }
}
