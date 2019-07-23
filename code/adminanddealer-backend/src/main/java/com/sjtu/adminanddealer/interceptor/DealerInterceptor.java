package com.sjtu.adminanddealer.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 拦截器：验证经销商是否登录以及登录的session是否匹配
 *
 * @author Chuyuxuan
 */
@Component
public class DealerInterceptor implements HandlerInterceptor {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //无论访问的地址是不是正确的，都进行登录验证，登录成功后的访问再进行分发，404的访问自然会进入到错误控制器中
        HttpSession session = request.getSession();
        if (session.getAttribute("loginUserId") != null &&
                ((String) session.getAttribute("loginUserType")).equals("DEALER")) {
            try {
                //验证当前请求的session是否是已登录的session
                String loginSessionId = redisTemplate.opsForValue().get("loginUser:" + (long) session.getAttribute("loginUserId"));
                if (loginSessionId != null && loginSessionId.equals(session.getId())) {
                    String origin = request.getHeader("Origin");
                    response.setHeader("Access-Control-Allow-Origin", origin);
                    response.setHeader("Access-Control-Allow-Methods", "*");
                    response.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,token,X-Requested-With");
                    response.setHeader("Access-Control-Allow-Credentials", "true");
                    return true;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        response401(request, response);
        return false;
    }

    private void response401(HttpServletRequest request, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        String origin = request.getHeader("Origin");
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,token,X-Requested-With");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        try {

            response.sendError(401, "用户未登录");
            // response.getWriter().print(JSON.toJSONString(new ReturnData(StatusCode.NEED_LOGIN, "", "用户未登录！")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

}

