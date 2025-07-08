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
    public Post create(@RequestBody Post post) { return postService.save(post); }

    @GetMapping
    public List<Post> readAll() { return postService.findAll(); }

    @GetMapping("{id}")
    public Post readOne(@PathVariable Long id) { return postService.findById(id); }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id, @RequestBody Post post) { return postService.update(id, post); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { postService.delete(id); }

}
