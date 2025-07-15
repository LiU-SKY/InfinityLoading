import React from 'react';
import PostList from '../components/PostList';
import { useNavigate } from 'react-router-dom';
import './BoardPage.css';

// 게시판 메인 페이지. 게시글 목록을 보여줌.
function BoardPage({ posts }) {
    const navigate = useNavigate();

    // 게시글 항목을 클릭했을 때 상세 페이지로 이동하는 함수.
    const handleSelectPost = (post) => {
        navigate(`/post/${post.id}`);
    };

    return (
        <div className="board-container">
            <div className="board-header">
                <h1>게시판</h1>
            </div>
            {/* PostList 컴포넌트를 사용해 게시글 목록을 렌더링. */}
            <PostList posts={posts} onSelect={handleSelectPost} />
        </div>
    );
}

export default BoardPage;