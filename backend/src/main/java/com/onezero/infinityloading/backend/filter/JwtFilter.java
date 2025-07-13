package com.onezero.infinityloading.backend.filter;

import com.onezero.infinityloading.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;

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
                Claims claims = jwtUtil.validateTokenAndGetClaims(authHeader.substring(7));
                String username = claims.getSubject();
                String role = claims.get("role", String.class);

                System.out.println("username from token: " + username);
                System.out.println("role from token: " + role);

                req.setAttribute("username", username);
                req.setAttribute("role", role);

                // Spring Security Context에 인증 정보 설정:
                // JWT 토큰에서 추출한 사용자 이름과 역할을 기반으로 Authentication 객체를 생성합니다.
                // 이 객체는 SecurityContextHolder에 설정되어 Spring Security가 현재 요청의
                // 인증된 사용자를 인식하도록 합니다. 비밀번호는 이미 검증되었으므로 null로 설정합니다.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null,
                        Collections.singletonList(new SimpleGrantedAuthority(role)));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (IllegalArgumentException e) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰 유효하지 않음");
                return;
            }
        }

        chain.doFilter(request, response);
    }

}
