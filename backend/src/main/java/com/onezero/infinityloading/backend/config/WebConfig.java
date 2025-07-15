package com.onezero.infinityloading.backend.config;

import com.onezero.infinityloading.backend.filter.JwtFilter;
import com.onezero.infinityloading.backend.util.JwtUtil;
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

    // 이전에는 JwtFilter를 FilterRegistrationBean을 통해 서블릿 필터로 등록했으나,
    // Spring Security의 필터 체인에 JwtFilter를 통합하면서 이중 등록을 방지하기 위해 제거되었습니다.
    // 이제 JwtFilter는 SecurityConfig에서 관리됩니다.
}