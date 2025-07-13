package com.onezero.infinityloading.backend.controller;

import com.onezero.infinityloading.backend.domain.User;
import com.onezero.infinityloading.backend.service.UserService;
import com.onezero.infinityloading.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register") /*POST 방식으로 /users/register 요청 처리*/
    public ResponseEntity<String> register(@RequestBody Map<String, String> payload)/*쿼리 파라미터 또는 폼 데이터 받음*/ {
        userService.register(payload.get("username"), payload.get("password")); /*서비스 계층으로 요청을 전달*/
        return ResponseEntity.ok("회원가입 성공"); /*성공 메시지를 응답*/
    }

    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody Map<String, String> payload) {
        userService.registerAdmin(payload.get("username"), payload.get("password"));
        return ResponseEntity.ok("관리자 회원가입 성공");
    }

    @PostMapping("/login") /*사용자 이름과 비밀번호 검증*/
    public ResponseEntity<String> login(@RequestBody Map<String, String> payload) {
        System.out.println("[UserController] /login 요청 수신: username=" + payload.get("username"));
        try {
            User user = userService.login(payload.get("username"), payload.get("password"));
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
            System.out.println("[UserController] 토큰 생성 성공: " + token);
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            System.err.println("[UserController] 로그인 중 에러 발생: " + e.getMessage());
            return ResponseEntity.status(401).body("로그인 실패: " + e.getMessage());
        }
    }
}
