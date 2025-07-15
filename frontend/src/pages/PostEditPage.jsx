import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import apiClient from '../api/axios';

// 게시글 수정 페이지.
function PostEditPage({ onEdit }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await apiClient.get(`/post/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("게시글을 불러오는데 실패했습니다.", error);
                alert("수정할 글을 찾을 수 없습니다.");
                navigate('/board');
            }
        };
        fetchPost();
    }, [id, navigate]);

    // 폼 제출 시 실행되는 함수.
    const handleSubmit = (postData) => {
        // 부모 컴포넌트(App.jsx)의 onEdit 함수를 호출.
        onEdit(post.id, postData);
        navigate('/board');
    };

    if (!post) {
        return <div className="page-container">게시글 정보를 불러오는 중...</div>;
    }

    return (
        <div className="page-container">
            <div className="write-box">
                <h2>게시글 수정</h2>
                {/* PostForm 컴포넌트에 기존 게시글 데이터(post)를 전달하여 수정 모드로 사용. */}
                <PostForm post={post} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default PostEditPage;