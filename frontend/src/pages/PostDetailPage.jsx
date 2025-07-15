import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostDetail from '../components/PostDetail';
import apiClient from '../api/axios';
import './PostDetailPage.css';

// 게시글 상세 보기 페이지.
function PostDetailPage({ user, onDelete }) {
    // URL 파라미터에서 게시글의 id를 가져옴.
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
                alert("게시글을 찾을 수 없습니다.");
                navigate('/board');
            }
        };
        fetchPost();
    }, [id, navigate]);


    // 게시글이 없으면 메시지를 표시.
    if (!post) return <div className="page-container">글을 불러오는 중...</div>;

    // 삭제 버튼 클릭 시 실행되는 함수.
    const handleDelete = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            // 부모 컴포넌트(App.jsx)의 onDelete 함수를 호출.
            onDelete(post.id);
            navigate('/board');
        }
    };

    return (
        <div className="board-container">
            {/* PostDetail 컴포넌트에 필요한 데이터와 함수를 props로 전달. */}
            <PostDetail
                post={post}
                user={user}
                onBack={() => navigate('/board')}
                onDelete={handleDelete}
                onEdit={() => navigate(`/edit/${post.id}`)}
            />
        </div>
    );
}

export default PostDetailPage;