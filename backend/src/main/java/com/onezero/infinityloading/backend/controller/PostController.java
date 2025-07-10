package com.onezero.infinityloading.backend.controller;

import com.onezero.infinityloading.backend.domain.Post;
import com.onezero.infinityloading.backend.service.PostService;
import jakarta.servlet.http.HttpServletRequest; // HTTP 요청 객체를 사용하기 위해 import
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor

public class PostController {
    private final PostService postService;

    @PostMapping
    public Post create(@RequestBody Post post, HttpServletRequest request) {
        // JWT 필터에서 인증 후 저장한 사용자 이름을 요청(request)에서 가져옴
        String username = (String) request.getAttribute("username");
        String htmlContent = postService.markdownToHtml(post.getContent());
        post.setContent(htmlContent);
        return postService.save(post, username);
    }

    @GetMapping
    public List<Post> readAll() { return postService.findAll(); }

    @GetMapping("/{id}")
    public Post readOne(@PathVariable Long id) { return postService.findById(id); }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id, @RequestBody Post post, HttpServletRequest request) {
        // JWT 필터에서 인증 후 저장한 사용자 이름을 요청(request)에서 가져옴
        String username = (String) request.getAttribute("username");
        String htmlContent = postService.markdownToHtml(post.getContent());
        post.setContent(htmlContent);
        return postService.update(id, post, username);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        // JWT 필터에서 인증 후 저장한 사용자 이름을 요청(request)에서 가져옴
        String username = (String) request.getAttribute("username");
        postService.delete(id, username);
    }

}
