package com.you_purchase.backenduser.controller;

import com.you_purchase.backenduser.service.OrderInfoService;
import com.you_purchase.backenduser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {
    @Autowired
    protected UserService userService;

    @Autowired
    protected OrderInfoService orderInfoService;
}
