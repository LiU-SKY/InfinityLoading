// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import LoginPage from './pages/LoginPage'; // Auth 대신 LoginPage로 명확히
import Board from './pages/BoardPage';
// PostForm은 PostWritePage와 PostEditPage 내부에서 사용되므로 직접 임포트 불필요
import SignupPage from './pages/SignupPage';
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from './pages/PostEditPage';
import PostWritePage from './pages/PostWritePage';
import './App.css';

function App() {
    const [user, setUser] = useState(null); // 로그인 사용자 상태
    const [posts, setPosts] = useState([]); // 게시글 데이터는 App.js에서 중앙 관리

    // 게시글 추가
    const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    // 게시글 삭제
    const handleDeletePost = (id) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    // 게시글 수정
    const handleEditPost = (editedPost) => {
        setPosts(posts.map(p => (p.id === editedPost.id ? editedPost : p)));
    };

    return (
        <BrowserRouter>
            {/* user가 null이 아닐 때만 Header를 보여주도록 함 */}
            {user && <Header user={user} onLogout={() => setUser(null)} />}

            <Routes>
                {/* 회원가입 페이지 */}
                <Route
                    path="/signup"
                    element={<SignupPage onSignup={(userData) => console.log(userData, '회원가입 완료')} />} // userData로 명확히
                />

                {/* 로그인 페이지 */}
                <Route
                    path="/login"
                    element={
                        user ? <Navigate to="/board" /> : <LoginPage onLogin={setUser} /> // Auth 대신 LoginPage로 명확히
                    }
                />

                {/* 게시판 목록 페이지 */}
                <Route
                    path="/board"
                    element={
                        user ? <Board posts={posts} /> : <Navigate to="/login" /> // Board에 posts만 전달
                    }
                />

                {/* 글쓰기 페이지 */}
                <Route
                    path="/write"
                    element={user ? <PostWritePage onAdd={handleAddPost} /> : <Navigate to="/login" />}
                />

                {/* 게시글 상세 페이지 */}
                <Route
                    path="/post/:id"
                    element={user ? <PostDetailPage posts={posts} onDelete={handleDeletePost} /> : <Navigate to="/login" />}
                />

                {/* 게시글 수정 페이지 */}
                <Route
                    path="/edit/:id"
                    element={user ? <PostEditPage posts={posts} onEdit={handleEditPost} /> : <Navigate to="/login" />}
                />

                {/* 기본 루트는 로그인으로 리디렉트 */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;