package com.sjtu.adminanddealer.config;

import com.sjtu.adminanddealer.mvc.RedisSessionInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

/**
 * 使用session拦截请求，未登录的用户无法访问到接口
 *
 * @author Chuyuxuan
 */
@Configuration
@EnableWebMvc
public class WebSessionConfig extends WebMvcConfigurationSupport {
    @Bean
    public RedisSessionInterceptor getSessionInterceptor()
    {
        return new RedisSessionInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry)
    {
        // 所有api开头的访问都要进入RedisSessionInterceptor拦截器进行登录验证，并排除login接口(全路径)。
        // 必须写成链式，分别设置的话会创建多个拦截器。
        // 必须写成getSessionInterceptor()，否则SessionInterceptor中的@Autowired会无效
        registry.addInterceptor(getSessionInterceptor())
                .addPathPatterns("/commodities/**")
                .addPathPatterns("/stores/**")
                .addPathPatterns("/admins/**")
                .addPathPatterns("/dealers/**")
                .excludePathPatterns("/login/**");
        super.addInterceptors(registry);
    }

}
