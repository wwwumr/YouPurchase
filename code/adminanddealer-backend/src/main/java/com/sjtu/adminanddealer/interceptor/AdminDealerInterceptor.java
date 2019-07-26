package com.sjtu.adminanddealer.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 对于管理员经销商共用接口的拦截器
 *
 * @author Chuyuxuan
 */
@Component
public class AdminDealerInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //无论访问的地址是不是正确的，都进行登录验证，登录成功后的访问再进行分发，404的访问自然会进入到错误控制器中
        HttpSession session = request.getSession();
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
//        System.out.println(session.getAttribute("loginUserType"));
        if (((String) session.getAttribute("loginUserType")).equals("ADMIN") ||
                ((String) session.getAttribute("loginUserType")).equals("DEALER")) {
            return true;
        }

        response.sendError(401, "用户未登录");
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

}
