package com.onezero.infinityloading.backend.domain;

import jakarta.persistence.*;
//  JPA 관련 주요 어노테이션 사용을 위한 모듈 (Entity, Id, GeneratedValue, Column)

import lombok.Getter;
// 코드 단축을 위한 모듈, 모든 필드에 대해 자동으로 getter 메서드 생성

import lombok.NoArgsConstructor;
import lombok.Setter;
// 매개변수 없는 생성자 자동으로 생성

@Entity
@Getter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String title;

    @Setter
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Setter
    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private int views = 0;

    public Post(String title, String content, String writer) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.views = 0; // 생성 시 조회수 초기화
    }

    // 조회수 증가 메서드
    public void increaseViewCount() {
        this.views++;
    }
}
