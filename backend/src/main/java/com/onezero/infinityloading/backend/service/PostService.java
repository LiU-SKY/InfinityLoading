package com.onezero.infinityloading.backend.service;

import com.onezero.infinityloading.backend.entity.Post;
import com.onezero.infinityloading.backend.repository.PostRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class PostService {

    private final PostRepository postRepository;

    public Post save(Post post) { return postRepository.save(post); }

    public List<Post> findAll() { return postRepository.findAll(); }

    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("해당 게시글 없음"));
    }

    public Post update(Long id, Post newPost) {
        Post post = findById(id);
        post = new Post(newPost.getTitle(), newPost.getContent(), newPost.getWriter());
        return postRepository.save(post);
    }

    public void delete(Long id) { postRepository.deleteById(id); }


}
