package com.onezero.infinityloading.backend.repository;

import com.onezero.infinityloading.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> /*ser 객체를 DB에 저장하고, ID는 Long 타입임을 의미한다.*/ {
    Optional<User> findByUsername(String username); /*username을 기준으로 사용자 찾기*/

}
