import React from 'react';
import './PostList.css';

// 게시글 목록을 리스트 형태로 보여주는 컴포넌트.
function PostList({ posts, onSelect }) {
    // 표시할 게시글이 없으면 메시지를 출력.
    if (!posts || posts.length === 0) {
        return <p className="no-posts">게시글이 없습니다. 첫 글을 작성해보세요!</p>;
    }

    return (
        <ul className="post-list">
            {/* posts 배열을 순회하며 각 게시글을 <li> 항목으로 렌더링. */}
            {posts.map((post) => (
                <li key={post.id} onClick={() => onSelect(post)} className="post-list-item">
                    <span className="post-id">{post.id}</span>
                    <span className="post-title">{post.title}</span>
                    <div className="post-meta">
                        <span className="post-writer">{post.writer}</span>
                        <span className="post-views">조회수: {post.views}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PostList;