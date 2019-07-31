package com.example.websocket;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class SessionTestController {

    @GetMapping("/session/test")
    public String test(HttpSession session) {
        System.out.println(session.getId());
        return session.getId();
    }
}
