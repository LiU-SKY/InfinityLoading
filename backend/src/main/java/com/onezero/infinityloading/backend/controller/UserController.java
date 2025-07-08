package com.onezero.infinityloading.backend.controller;

import com.onezero.infinityloading.backend.domain.User;
import com.onezero.infinityloading.backend.service.UserService;
import com.onezero.infinityloading.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register") /*POST 방식으로 /users/register 요청 처리*/
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String password)/*쿼리 파라미터 또는 폼 데이터 받음*/ {
        userService.register(username, password); /*서비스 계층으로 요청을 전달*/
        return ResponseEntity.ok("회원가입 성공"); /*성공 메시지를 응답*/
    }

    @PostMapping("/login") /*사용자 이름과 비밀번호 검증*/
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        User user = userService.login(username, password);
        String token = jwtUtil.generateToken(user.getUsername()); /*인증된 사용자에게 JWT 토큰 발급*/
        return ResponseEntity.ok(token); /*클라이언트에게 토큰 응답*/
    }
}
