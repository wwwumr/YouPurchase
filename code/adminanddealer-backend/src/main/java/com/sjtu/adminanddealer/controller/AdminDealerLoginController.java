package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
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
    public String adminLogin(@RequestParam("userName") String userName, @RequestParam("password") String password,
            HttpSession session) {
        Admin admin = adminDealerLoginService.getAdminByUserNameAndPassword(userName, password);
        if (admin != null) {
            session.setAttribute("loginUserId", admin.getAdminId());
            session.setAttribute("loginType", "ADMIN");
            session.setAttribute("userName", admin.getUserName());
            session.setAttribute("userId", admin.getAdminId());
            adminDealerLoginService.addSessionIdToRedis("loginUser:" + admin.getAdminId(), session.getId());
            return "ADMIN";
        } else {
            return "ERROR";
        }
    }

    @GetMapping("/login/dealer")
    public DealerDTO dealerLogin(@RequestParam("userName") String userName, @RequestParam("password") String password,
            HttpSession session) {
        Dealer dealer = adminDealerLoginService.getDealerByUserNameAndPassword(userName, password);
        if (dealer != null) {
            session.setAttribute("loginUserId", dealer.getDealerId());
            session.setAttribute("loginUserType", "DEALER");
            session.setAttribute("userName", dealer.getUserName());
            session.setAttribute("userId", dealer.getDealerId());
            adminDealerLoginService.addSessionIdToRedis("loginUser:" + dealer.getDealerId(), session.getId());
            DealerDTO dto = new DealerDTO(dealer.getDealerId(), dealer.getUserName(), dealer.getAvatar(), dealer.getAddress(),
             dealer.getRealName(), dealer.getContact(), (dealer.getStore()!=null)?dealer.getStore().getStoreId():null, 
             (dealer.getStore()!=null)?dealer.getStore().getStoreName():null, null);
            return dto;
        }
        return new DealerDTO();
    }

    @GetMapping("/logout")
    public String adminDealerLogOut(HttpSession session) {
        Long id = (Long) session.getAttribute("loginUserId");
        session.removeAttribute("loginUserId");
        session.removeAttribute("loginUserType");
        session.removeAttribute("userName");
        session.removeAttribute("userId");
        adminDealerLoginService.deleteSessionId("loginUser:" + id);
        return "LOGOUT";
    }

    @GetMapping("/login/userName")
    public String getUserNameFromSession(HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        if (userName != null) {
            return userName;
        }
        return "";
    }

    @GetMapping("/login/userId")
    public Long getUserIdFromSession(HttpSession session) {
        Long id = (Long) session.getAttribute("loginUserId");
        if (id != null) {
            return id;
        }
        return null;
    }

}
