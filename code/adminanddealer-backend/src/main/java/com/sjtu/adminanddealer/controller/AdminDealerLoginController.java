package com.sjtu.adminanddealer.controller;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import com.sun.org.apache.xpath.internal.SourceTree;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.http.HttpSession;

/**
 * @author Chuyuxuan
 */
@CrossOrigin
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
            session.setAttribute("loginUserId", admin.getAdminId());
            session.setAttribute("loginType","ADMIN");
            session.setAttribute("userName", admin.getUserName());
            adminDealerLoginService.addSessionIdToRedis("loginUser:"+admin.getAdminId(),session.getId());
//            session.setAttribute("admin", admin);
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
            session.setAttribute("loginUserId", dealer.getDealerId());
            session.setAttribute("loginUserType","DEALER");
            session.setAttribute("userName", dealer.getUserName());
            adminDealerLoginService.addSessionIdToRedis("loginUser:"+dealer.getDealerId(), session.getId());
            // session.setAttribute("dealer", dealer);
            return "DEALER";
        } else {
            return "ERROR";
        }
    }

    @GetMapping("/logout")
    public String adminDealerLogOut(HttpSession session) {
        // session.removeAttribute("dealer");
        // session.removeAttribute("admin");
        Long id = (Long)session.getAttribute("loginUserId");
        //if(id!=null){
            session.removeAttribute("loginUserId");
            session.removeAttribute("loginUserType");
            session.removeAttribute("userName");
            adminDealerLoginService.deleteSessionId("loginUser:"+id);
        //}
        return "LOGOUT";
    }

    @GetMapping("/login/userName")
    public String getUserNameFromSession(HttpSession session) {
        String userName = (String)session.getAttribute("userName");
        if(userName!=null){
            return userName;
        } else {
            return "";
        }
    }

}
