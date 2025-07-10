package com.onezero.infinityloading.backend.config;

import com.onezero.infinityloading.backend.filter.JwtFilter;
import com.onezero.infinityloading.backend.util.JwtUtil;
import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

    private final JwtUtil jwtUtil;

    public WebConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public JwtFilter jwtFilter() {
        return new JwtFilter(jwtUtil);
    }


    @Bean
    public FilterRegistrationBean<Filter> jwtFilterRegistration(JwtFilter jwtFilter){
        /*JwtFilter를 필터로 등록하는 Spring 방식이며 이 필터가 어떤 경로에 적용될지 지정한다.*/
        FilterRegistrationBean<Filter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtFilter);
        registrationBean.addUrlPatterns("/post/*"); // 인증 필터 적용 경로
        return registrationBean;
    }
}