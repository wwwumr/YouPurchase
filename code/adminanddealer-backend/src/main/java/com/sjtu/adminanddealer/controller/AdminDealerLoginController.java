package com.sjtu.adminanddealer.controller;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.UserLoginDTO;
import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.User;
import com.sjtu.adminanddealer.parameter.UserLoginParameter;
import com.sjtu.adminanddealer.service.AdminDealerLoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * @author Chuyuxuan
 */
@CrossOrigin
@RestController
@Api(tags = "登录相关接口")
public class AdminDealerLoginController {

    @Autowired
    private AdminDealerLoginService adminDealerLoginService;

    @GetMapping("/login/admin")
    @ApiOperation(value = "管理员登录")
    public String adminLogin(@RequestParam("userName") String userName, @RequestParam("password") String password,
                             HttpSession session) {
        Admin admin = adminDealerLoginService.getAdminByUserNameAndPassword(userName, password);
        if (admin != null) {
            session.setAttribute("loginUserId", admin.getAdminId());
            session.setAttribute("loginUserType", "ADMIN");
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
            if (dealer.getStore() == null) {
                session.setAttribute("storeId", null);
            } else {
                session.setAttribute("storeId", dealer.getStore().getStoreId());
            }
            adminDealerLoginService.addSessionIdToRedis("loginUser:" + dealer.getDealerId(), session.getId());
            DealerDTO dto = new DealerDTO(dealer.getDealerId(), dealer.getUserName(), dealer.getAvatar(), dealer.getAddress(),
                    dealer.getRealName(), dealer.getContact(), (dealer.getStore() != null) ? dealer.getStore().getStoreId() : null,
                    (dealer.getStore() != null) ? dealer.getStore().getStoreName() : null, null);
            return dto;
        }
        return new DealerDTO();
    }

    @PostMapping("/login/user")
    public UserLoginDTO userLogin(@RequestBody UserLoginParameter parameter, HttpSession session) {
        User user = adminDealerLoginService.getUserByPhoneAndPassword(parameter.getPhone(), parameter.getPassword());
        if (user != null) {
            session.setAttribute("loginUserId", user.getUserId());
            session.setAttribute("loginUserType", "USER");
            session.setAttribute("userName", user.getUserName());
            adminDealerLoginService.addSessionIdToRedis("loginUser:" + user.getUserId(), session.getId());
            return new UserLoginDTO(200, user);
        }
        return new UserLoginDTO(404, null);
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
    public JSONObject getUserNameFromSession(HttpSession session) {
        JSONObject json = new JSONObject();
        String userName = (String) session.getAttribute("userName");
        if (userName != null) {
            json.put("userName", userName);
            json.put("type", (String) session.getAttribute("loginUserType"));
        }
        return json;
    }

    @GetMapping("/login/userId")
    public JSONObject getUserIdFromSession(HttpSession session) {
        JSONObject json = new JSONObject();
        Long id = (Long) session.getAttribute("loginUserId");
        if (id != null) {
            json.put("id", id);
            json.put("type", (String) session.getAttribute("loginUserType"));
        }
        return json;
    }

}
