package com.onezero.infinityloading.backend.service;

import com.onezero.infinityloading.backend.domain.Post;
import com.onezero.infinityloading.backend.domain.User;
import com.onezero.infinityloading.backend.repository.PostRepository;
import com.onezero.infinityloading.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

//마크다운
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;


@Service
@RequiredArgsConstructor

public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post save(Post post, String username) {
        post.setWriter(username);
        return postRepository.save(post);
    }

    public List<Post> findAll() { return postRepository.findAll(); }

    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("해당 게시글 없음"));
    }

    public Post update(Long id, Post newPost, String username) {
        Post post = findById(id);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        if (!post.getWriter().equals(username) && !user.getRole().equals("ADMIN")) {
            throw new IllegalArgumentException("작성자 또는 관리자만 수정할 수 있습니다.");
        }

        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());

        //get과 차이점 알아내서 어떻게 작성 할 건지 뜯어고치기

        //post = new Post(newPost.getTitle(), newPost.getContent(), newPost.getWriter());
        return postRepository.save(post);
    }

    public void delete(Long id, String username) {
        Post post = findById(id);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));
        if (!post.getWriter().equals(username) && !user.getRole().equals("ADMIN")){
            throw new IllegalArgumentException("작성자 또는 관리자만 삭제할 수 있습니다.");
        }
        postRepository.deleteById(id);
    }


    public Post getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        post.incrementViews();
        postRepository.save(post);

        return post;
    }

    public String markdownToHtml(String markdown){
        Parser parser = Parser.builder().build();
        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder().build();
        return renderer.render(document);
    }

}
