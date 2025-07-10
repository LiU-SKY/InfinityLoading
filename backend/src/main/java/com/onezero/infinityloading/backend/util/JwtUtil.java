package com.onezero.infinityloading.backend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct; // @PostConstruct 어노테이션을 사용하기 위해 import
import org.springframework.beans.factory.annotation.Value; // application.properties 값을 주입받기 위해 import
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // application.properties 파일에서 jwt.secret 값을 주입받음
    @Value("${jwt.secret}")
    private String secret;

    // JWT 서명에 사용할 키. @PostConstruct를 통해 초기화됨
    private SecretKey key;

    private static final long EXPIRATION_TIME = 86400000; // 1일

    // 의존성 주입이 완료된 후, 주입받은 secret 값을 기반으로 SecretKey를 생성
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 사용자 이름을 기반으로 JWT 토큰을 생성합니다.
     * @param username 사용자 이름
     * @return 생성된 JWT 토큰
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // 토큰의 주체로 사용자 이름을 설정
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 만료 시간 설정
                .signWith(key, SignatureAlgorithm.HS512) // HS512 알고리즘과 SecretKey를 사용하여 서명
                .compact();
    }

    /**
     * 토큰의 유효성을 검증하고 사용자 이름을 추출합니다.
     * @param token 클라이언트로부터 받은 JWT 토큰
     * @return 추출된 사용자 이름
     */
    public String validateTokenAndGetUsername(String token) {
        try {
            // SecretKey를 사용하여 토큰을 파싱하고 Claims를 추출 (최신, 안전한 방식)
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰 파싱 중 오류 발생 시 (만료, 형식 오류 등)
            throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
        }
    }
}
