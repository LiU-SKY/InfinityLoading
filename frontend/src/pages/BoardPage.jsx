// BoardPage.jsx
import React from 'react';
import PostList from '../components/PostList';
import { useNavigate } from 'react-router-dom';
import './BoardPage.css'; // BoardPage 전용 CSS 임포트

function Board({ posts }) {
    const navigate = useNavigate();

    const handleSelectPost = (post) => {
        navigate(`/post/${post.id}`);
    };

    return (
        <div className="board-container"> {/* .board-container 스타일 적용 */}
            <PostList posts={posts} onSelect={handleSelectPost} />
        </div>
    );
}

export default Board;