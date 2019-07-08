package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author Chuyuxuan
 */
@RestController
@RequestMapping("/login")
public class AdminDealerLoginController {

    @Autowired
    private AdminDealerLoginService adminDealerLoginService;


    @GetMapping("/admin")
    public String adminLogin(@RequestParam("userName") String userName,
                             @RequestParam("password") String password,
                             HttpSession session) {
        Admin admin = adminDealerLoginService.getAdminByUserNameAndPassword(userName, password);
        if (admin != null) {
            session.setAttribute("admin", admin);
            return "ADMIN";
        } else {
            return "ERROR";
        }
    }

    @GetMapping("/dealer")
    public String dealerLogin(@RequestParam("userName") String userName,
                              @RequestParam("password") String password,
                              HttpSession session) {
        Dealer dealer = adminDealerLoginService.getDealerByUserNameAndPassword(userName, password);
        if (dealer != null) {
            session.setAttribute("dealer", dealer);
            return "DEALER";
        } else {
            return "ERROR";
        }
    }

}
