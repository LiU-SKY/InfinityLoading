package com.onezero.infinityloading.backend.service;

import com.onezero.infinityloading.backend.domain.Post;
import com.onezero.infinityloading.backend.domain.User;
import com.onezero.infinityloading.backend.repository.PostRepository;
import com.onezero.infinityloading.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    @Transactional
    public Post findById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("해당 게시글 없음"));
        post.increaseViewCount(); // 조회수 증가
        return post;
    }

    @Transactional
    public Post update(Long id, Post newPost, String username) {
        // findById() 대신 repository를 직접 호출하여 조회수 증가를 방지합니다.
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시글 없음"));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        if (!post.getWriter().equals(username) && !user.getRole().equals("ADMIN")) {
            throw new IllegalArgumentException("작성자 또는 관리자만 수정할 수 있습니다.");
        }

        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());
        return post; // @Transactional에 의해 변경 감지(dirty checking)되어 자동 저장됩니다.
    }

    @Transactional
    public void delete(Long id, String username) {
        // findById() 대신 repository를 직접 호출하여 조회수 증가를 방지합니다.
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시글 없음"));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));
        if (!post.getWriter().equals(username) && !user.getRole().equals("ADMIN")){
            throw new IllegalArgumentException("작성자 또는 관리자만 삭제할 수 있습니다.");
        }
        postRepository.delete(post);
    }

    public String markdownToHtml(String markdown){
        Parser parser = Parser.builder().build();
        Node document = parser.parse(markdown);
        HtmlRenderer renderer = HtmlRenderer.builder().build();
        return renderer.render(document);
    }

}
