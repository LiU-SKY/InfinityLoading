package com.onezero.infinityloading.backend.controller;

import com.onezero.infinityloading.backend.entity.Post;
import com.onezero.infinityloading.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor

public class PostController {
    private final PostService postService;

    @PostMapping
    public Post create(@RequestBody Post post, @RequestParam String username) {
        String htmlContent = postService.markdownToHtml(post.getContent());
        post.setContent(htmlContent);
        return postService.save(post, username);
        // 파라미터로 username을 받는 부분을 회원기능과 연동해서 파라미터로 받지 않게 해야함
    }

    @GetMapping
    public List<Post> readAll() { return postService.findAll(); }

    @GetMapping("{id}")
    public Post readOne(@PathVariable Long id) { return postService.findById(id); }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id, @RequestBody Post post, @RequestParam String username) {
        String htmlContent = postService.markdownToHtml(post.getContent());
        post.setContent(htmlContent);
        return postService.update(id, post, username);
        // 파라미터로 username을 받는 부분을 회원기능과 연동해서 파라미터로 받지 않게 해야함
        // post와 비슷하게 동작함
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @RequestParam String username) { postService.delete(id, username); }

}
