import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '../pages/PostDetailPage.css';

// 게시글의 상세 내용을 보여주는 컴포넌트.
function PostDetail({ post, user, onBack, onDelete, onEdit }) {
    // 현재 로그인한 사용자가 게시글의 작성자인지 확인.
    const isAuthor = user && user.username === post.writer;

    return (
        <div className="common-box" data-color-mode="light">
            <h2>{post.title}</h2>
            <p className="post-writer">작성자: {post.writer}</p>
            {/* MDEditor.Markdown을 사용해 마크다운 콘텐츠를 안전하게 렌더링. */}
            <MDEditor.Markdown source={post.content} className="post-content" />
            <div className="post-actions">
                <button onClick={onBack}>목록으로</button>
                {/* 작성자일 경우에만 '수정'과 '삭제' 버튼을 보여줌. */}
                {isAuthor && (
                    <>
                        <button onClick={onEdit}>수정</button>
                        <button onClick={onDelete} className="delete-button">삭제</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PostDetail;