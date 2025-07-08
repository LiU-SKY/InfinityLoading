package com.onezero.infinityloading.backend.util;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "mySecretKeyisveryveryveryveryveryveryverylong";
    private static final long EXPIRATION_TIME = 86400000; // 1일

    public String generateToken(String username) { /*JWT 토큰을 생성하여 반환*/
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public String validateTokenAndGetUsername(String token) { /*클라이언트로부터 받은 토큰이 유효한지 확인하고, 사용자 이름 추출*/
        try {
            Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
            return claims.getSubject();
        } catch (JwtException e) {
            throw new IllegalArgumentException("토큰 오류");
        }
    }
}
