package com.sjtu.adminanddealer.config;

import com.sjtu.adminanddealer.interceptor.AdminInterceptor;
import com.sjtu.adminanddealer.interceptor.DealerInterceptor;
import com.sjtu.adminanddealer.interceptor.RedisSessionInterceptor;
import com.sjtu.adminanddealer.interceptor.UserInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

import static java.util.Arrays.asList;

/**
 * 使用session拦截请求，未登录的用户无法访问到接口
 * 增加跨域配置，便于前后端调试
 *
 * @author Chuyuxuan
 */
@Configuration
@EnableWebMvc
public class SessionAndCrossOriginConfig implements WebMvcConfigurer {
    @Bean
    public RedisSessionInterceptor getSessionInterceptor() {
        return new RedisSessionInterceptor();
    }

    @Bean
    public AdminInterceptor getAdminInterceptor() {
        return new AdminInterceptor();
    }

    @Bean
    public DealerInterceptor getDealerInterceptor() {
        return new DealerInterceptor();
    }

    @Bean
    public UserInterceptor getUserInterceptor() {
        return new UserInterceptor();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //设置允许跨域的路径
        registry.addMapping("/**")
                //设置允许跨域请求的域名
                .allowedOrigins("*")
                //是否允许证书 不再默认开启
                .allowCredentials(true)
                //设置允许的方法
                .allowedMethods("*")
                //跨域允许时间
                .maxAge(3600);
    }

    /**/
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 所有api开头的访问都要进入RedisSessionInterceptor拦截器进行登录验证，并排除login接口(全路径)。
        // 必须写成链式，分别设置的话会创建多个拦截器。
        // 必须写成getSessionInterceptor()，否则SessionInterceptor中的@Autowired会无效
        List<String> adminPathPatterns = asList("/admin/**", "/stores/**", "/dealers/**");
        List<String> dealerPathPatterns = asList("/stores/delivery", "/stores/dealer/store");

        registry.addInterceptor(getSessionInterceptor())
                .addPathPatterns("/commodities/**")
                .addPathPatterns("/stores/**")
                .addPathPatterns("/admins/**")
                .addPathPatterns("/dealers/**")
                .excludePathPatterns("/login/**")
                .excludePathPatterns("/logout");

    }


}
