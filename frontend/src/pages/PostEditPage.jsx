import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import './PostEditPage.css';

// 게시글 수정 페이지.
function PostEditPage({ posts, onEdit }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // 수정할 게시글 정보를 찾음.
    const post = posts.find(p => p.id === Number(id));
    if (!post) {
        return <div className="page-container">수정할 글을 찾을 수 없습니다</div>;
    }

    // 폼 제출 시 실행되는 함수.
    const handleSubmit = (postData) => {
        // 부모 컴포넌트(App.jsx)의 onEdit 함수를 호출.
        onEdit(post.id, postData);
        navigate('/board');
    };

    return (
        <div className="page-container">
            <div className="common-box">
                <h2>게시글 수정</h2>
                {/* PostForm 컴포넌트에 기존 게시글 데이터(post)를 전달하여 수정 모드로 사용. */}
                <PostForm post={post} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default PostEditPage;