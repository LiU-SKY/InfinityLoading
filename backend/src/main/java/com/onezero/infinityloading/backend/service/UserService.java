package com.onezero.infinityloading.backend.service;

import com.onezero.infinityloading.backend.domain.User;
import com.onezero.infinityloading.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User register(String username, String rawPassword) { /*회원가입을 담당하는 로직*/
        String encodedPassword = passwordEncoder.encode(rawPassword); /*사용자가 입력한 평문 비밀번호*/
        User user = new User(username, encodedPassword);/* 평문 비밀번호를 복호화 불가능한 암호화 처리*/
        return userRepository.save(user); /*DB에 사용자 저장*/
    }

    public User login(String username, String rawPassword) { /*로그인을 담당하는 로직*/
        User user = userRepository.findByUsername(username)/*해당 username을 가진 사용자 조회*/
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) { /*	입력한 비밀번호와 암호화된 비밀번호 비교*/
            throw new IllegalArgumentException("비밀번호 틀림"); /*틀렸을 경우 에러를 발생시킴*/
        }
        return user; /*로그인 성공 시 사용자 객체 반환*/
    }
}

