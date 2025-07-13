import React, { useState } from 'react';
import './PostForm.css';

// 게시글 작성 및 수정을 위한 폼 컴포넌트.
function PostForm({ post, onSubmit }) {
    // 'post' prop이 있으면 수정 모드, 없으면 작성 모드.
    // 수정 모드일 경우 기존 제목과 내용을 기본값으로 설정.
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');

    const handleSubmit = () => {
        // 제목이나 내용이 비어있는지 확인.
        if (!title.trim() || !content.trim()) {
            return alert('제목과 내용을 입력하세요');
        }
        // 부모 컴포넌트로부터 받은 onSubmit 함수를 호출하여 데이터 전달.
        // id는 서버에서 자동 생성되므로 여기서는 보내지 않음.
        onSubmit({
            title: title.trim(),
            content: content.trim(),
        });
    };

    return (
        <div className="post-form-container">
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="post-form-input"
            />
            <textarea
                placeholder="내용 (마크다운 지원)"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={10}
                className="post-form-textarea"
            />
            <div className="post-form-actions">
                {/* 수정 모드 여부에 따라 버튼 텍스트를 다르게 표시. */}
                <button onClick={handleSubmit}>{post ? '수정하기' : '작성하기'}</button>
            </div>
        </div>
    );
}

export default PostForm;