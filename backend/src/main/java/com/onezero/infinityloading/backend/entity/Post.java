package com.onezero.infinityloading.backend.entity;

import jakarta.persistence.*;
//  JPA 관련 주요 어노테이션 사용을 위한 모듈 (Entity, Id, GeneratedValue, Column)

import lombok.Getter;
// 코드 단축을 위한 모듈, 모든 필드에 대해 자동으로 getter 메서드 생성

import lombok.NoArgsConstructor;
// 매개변수 없는 생성자 자동으로 생성

@Entity
@Getter
@NoArgsConstructor

public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String writer;

    public Post(String title, String content, String writer) {
    }
}
