package com.onezero.infinityloading.backend.filter;

import com.onezero.infinityloading.backend.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil; //JWT 검증을 위해 JwtUtil 클래스를 사용하고 생성자로 주입받아 필터내부에서 사용 가능 하게 하는 코드

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String authHeader = req.getHeader("Authorization"); //JWT 검사 로직으로 HTTP 요청객체에서 헤더 중 Authorization 값을 가져온다.

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String username = jwtUtil.validateTokenAndGetUsername(authHeader.substring(7)); //키를 검증하는 로직으로 JwtUtil에서 이 토큰을 검증하고, 사용자 이름을 추출한다.
                req.setAttribute("username", username);
            } catch (IllegalArgumentException e) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰 유효하지 않음");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
