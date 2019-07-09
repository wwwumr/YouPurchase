package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author Chuyuxuan
 */
@RestController
public class AdminDealerLoginController {

    @Autowired
    private AdminDealerLoginService adminDealerLoginService;


    @GetMapping("/login/admin")
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

    @GetMapping("/login/dealer")
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

    @GetMapping("/logout")
    public String adminDealerLogOut(HttpSession session) {
        session.removeAttribute("dealer");
        session.removeAttribute("admin");
        return "LOGOUT";
    }

    @GetMapping("/userName")
    public String getUserName(HttpSession session) {
        if (session.getAttribute("admin") != null) {
            return ((Admin) session.getAttribute("admin")).getUserName();
        } else if (session.getAttribute("dealer") != null) {
            return ((Dealer) session.getAttribute("dealer")).getUserName();
        } else {
            return "NULL";
        }
    }

}
