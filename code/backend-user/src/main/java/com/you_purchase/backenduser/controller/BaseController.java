package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.service.*;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {
    @Autowired
    protected UserService userService;
    @Autowired
    protected OrderInfoService orderInfoService;
    @Autowired
    protected GradeService gradeService;
    @Autowired
    protected DeliveryAddressService deliveryAddressService;
    @Autowired
    protected AdvertService advertService;
}
