import React, { useState } from 'react';
import TiptapEditor from './Editor'; // MDEditor 대신 TiptapEditor를 import
import './PostForm.css';

// 게시글 작성 및 수정을 위한 폼 컴포넌트.
function PostForm({ post, onSubmit }) {
    const [title, setTitle] = useState(post?.title || '');
    // content의 초기값도 post에서 가져옴
    const [content, setContent] = useState(post?.content || '');

    const handleSubmit = () => {
        // Tiptap은 빈 내용을 '<p></p>'로 표현하므로, 이를 확인
        if (!title.trim() || !content.trim() || content === '<p></p>') {
            return alert('제목과 내용을 입력하세요');
        }
        onSubmit({
            title: title.trim(),
            content: content,
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
            {/* MDEditor를 TiptapEditor로 교체 */}
            <TiptapEditor
                content={content}
                onChange={setContent}
            />

            <div className="post-form-actions">
                <button onClick={handleSubmit}>{post ? '수정하기' : '작성하기'}</button>
            </div>
        </div>
    );
}

export default PostForm;