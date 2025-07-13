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
import org.springframework.util.AntPathMatcher;

import java.io.IOException;
import java.util.Collections;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private final List<String> excludedPaths = Arrays.asList("/users/register", "/users/login");

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String path = req.getRequestURI();

        // 제외할 경로인지 확인
        if (excludedPaths.stream().anyMatch(p -> pathMatcher.match(p, path))) {
            chain.doFilter(request, response); // 필터를 통과시킴
            return;
        }

        String authHeader = req.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                Claims claims = jwtUtil.validateTokenAndGetClaims(authHeader.substring(7));
                String username = claims.getSubject();
                String role = claims.get("role", String.class);

                req.setAttribute("username", username);
                req.setAttribute("role", role);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))); // "ROLE_" 접두사 ��가
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (IllegalArgumentException e) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰 유효하지 않음");
                return;
            }
        } else {
            // 토큰이 없는 경우, 공개된 경로가 아니라면 401 오류를 반환해야 할 수 있음
            // 현재 SecurityConfig에서 경로별 접근 제어를 하므로 여기서는 그냥 통과시킬 수 있음
        }

        chain.doFilter(request, response);
    }
}
