package com.onezero.infinityloading.backend.repository;

// JPA에서 데이터베이스와 통신하기 위해 사용하는 인터페이스
// Post 객체를 기반으로 데이터 베이스 작업을 수행

import com.onezero.infinityloading.backend.domain.Post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
