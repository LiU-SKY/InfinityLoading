package com.onezero.infinityloading.backend.config;

import com.onezero.infinityloading.backend.filter.JwtFilter;
import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter(JwtFilter jwtFilter){
        /*JwtFilter를 필터로 등록하는 Spring 방식이며 이 필터가 어떤 경로에 적용될지 지정한다.*/
        FilterRegistrationBean<Filter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtFilter);
        registrationBean.addUrlPatterns("/posts/*"); // 인증 필터 적용 경로
        return registrationBean;
    }
}
