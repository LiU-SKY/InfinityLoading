// BoardPage.jsx

import React from 'react'; // useState 제거

import PostList from '../components/PostList';

import { useNavigate } from 'react-router-dom'; // useNavigate 추가



import './BoardPage.css'; // BoardPage 전용 CSS



// App.js에서 posts prop만 받도록 간소화

function Board({ posts }) {

    const navigate = useNavigate();



// 게시글 상세 보기로 이동

    const handleSelectPost = (post) => {

        navigate(`/post/${post.id}`); // URL 변경하여 PostDetailPage로 이동

    };



    return (

        <div className="board-container"> {/* .board-container 스타일 적용 */}

            {/* '글 작성' 버튼은 Header로 옮겼으므로 여기서는 제거합니다. */}

            {/* <button className="write-button" onClick={handleWriteClick}>글 작성</button> */}



            {/* 게시글 목록을 렌더링하고, 클릭 시 상세 페이지로 이동 */}

            <PostList posts={posts} onSelect={handleSelectPost} />



            {/* PostDetail, PostForm 등은 App.js의 Route를 통해 독립된 페이지에서 렌더링됩니다. */}

            {/* 따라서 Board 컴포넌트 내에서 조건부 렌더링할 필요가 없습니다. */}

        </div>

    );

}



export default Board;