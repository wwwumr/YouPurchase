package com.sjtu.youpurchase.controller;

import com.sjtu.youpurchase.service.GradeService;
import com.sjtu.youpurchase.service.OrderService;
import com.sjtu.youpurchase.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {
    @Autowired
    protected UserService userService;

    @Autowired
    protected GradeService gradeService;

    @Autowired
    protected OrderService orderService;
}
