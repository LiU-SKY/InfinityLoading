import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import './PostWritePage.css';

// 새 글 작성 페이지.
function PostWritePage({ onAdd }) {
    const navigate = useNavigate();

    // 폼 제출 시 실행되는 함수.
    const handleSubmit = (postData) => {
        // 부모 컴포넌트(App.jsx)의 onAdd 함수를 호출.
        onAdd(postData);
        navigate('/board');
    };

    return (
        <div className="page-container">
            <div className="write-box">
                <h2>새 글 작성</h2>
                {/* PostForm 컴포넌트를 글 작성 모드로 사용. */}
                <PostForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default PostWritePage;