import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import LoginPage from './pages/LoginPage';
import BoardPage from './pages/BoardPage';
import SignupPage from './pages/SignupPage';
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from './pages/PostEditPage';
import PostWritePage from './pages/PostWritePage';
import apiClient from './api/axios';
import './App.css';
import { jwtDecode } from 'jwt-decode';

// 애플리케이션의 메인 컴포넌트. 라우팅, 상태 관리 등 핵심 로직을 담당.
function App() {
    // 'user' 상태: 현재 로그인된 사용자 정보 저장. null이면 비로그인 상태.
    const [user, setUser] = useState(null);
    // 'posts' 상태: 전체 게시글 목록 저장.
    const [posts, setPosts] = useState([]);
    // 'loading' 상태: 앱 초기 데이터 로딩 상태 관리.
    const [loading, setLoading] = useState(true);

    // 서버에서 모든 게시글을 가져오는 함수.
    // useCallback을 사용해 이 함수의 참조가 불필요하게 변경되는 것을 방지.
    const fetchPosts = useCallback(async () => {
        try {
            const response = await apiClient.get('/post');
            // 받아온 게시글을 id 내림차순(최신순)으로 정렬하여 상태 업데이트.
            setPosts(response.data.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error('게시글을 불러오는 데 실패했습니다:', error);
        }
    }, []);

    // 앱이 처음 마운트될 때 한 번만 실행되는 useEffect.
    // 로컬 스토리지에 저장된 토큰을 확인하여 사용자 로그인 상태를 복원.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // 토큰을 디코딩하여 사용자 정보를 추출.
                const decoded = jwtDecode(token);
                setUser({ username: decoded.sub, role: decoded.role }); // role 추가
            } catch (error) {
                console.error("Invalid token", error);
                // 토큰이 유효하지 않으면 삭제.
                localStorage.removeItem('token');
            }
        }
        // 토큰 확인 작업이 끝나면 로딩 상태를 false로 변경.
        setLoading(false);
    }, []);

    // 'user' 상태가 변경될 때마다 실행되는 useEffect.
    // 사용자가 로그인하면(user 객체가 생기면) 게시글 목록을 불러옴.
    useEffect(() => {
        if (user) {
            fetchPosts();
        }
    }, [user, fetchPosts]);

    // 로그인 처리 함수.
    const handleLogin = (token) => {
        // 서버로부터 받은 토큰을 로컬 스토리지에 저장.
        localStorage.setItem('token', token);
        try {
            const decoded = jwtDecode(token);
            // 토큰에서 추출한 사용자 이름과 역할로 user 상태 업데이트.
            setUser({ username: decoded.sub, role: decoded.role }); // role 추가
        } catch (error) {
            console.error("Invalid token", error);
        }
    };

    // 로그아웃 처리 함수.
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setPosts([]); // 게시글 목록 초기화
    };

    // 새 게시글 추가 처리 함수.
    const handleAddPost = async (postData) => {
        try {
            await apiClient.post('/post', postData);
            // 새 글 추가 후, 전체 목록을 다시 불러와 화면을 갱신.
            fetchPosts();
        } catch (error) {
            console.error('게시글 추가에 실패했습니다:', error);
        }
    };

    // 게시글 삭제 처리 함수.
    const handleDeletePost = async (id) => {
        try {
            await apiClient.delete(`/post/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('게시글 삭제에 실패했습니다:', error);
        }
    };

    // 게시글 수정 처리 함수.
    const handleEditPost = async (id, postData) => {
        try {
            await apiClient.put(`/post/${id}`, postData);
            fetchPosts();
        } catch (error) {
            console.error('게시글 수정에 실패했습니다:', error);
        }
    };

    // 초기 로딩 중일 경우 로딩 메시지를 표시.
    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <BrowserRouter>
            {/* 사용자가 로그인 상태일 때만 Header를 표시 */}
            {user && <Header user={user} onLogout={handleLogout} />}
            <Routes>
                {/* 각 경로에 맞는 페이지 컴포넌트를 렌더링 */}
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/board" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                    path="/board"
                    element={user ? <BoardPage posts={posts} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/write"
                    element={user ? <PostWritePage onAdd={handleAddPost} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/post/:id"
                    element={user ? <PostDetailPage posts={posts} user={user} onDelete={handleDeletePost} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/edit/:id"
                    element={user ? <PostEditPage posts={posts} onEdit={handleEditPost} /> : <Navigate to="/login" />}
                />
                {/* 사용자가 로그인 상태이면 '/board'로, 아니면 '/login'으로 리디렉션 */}
                <Route path="*" element={<Navigate to={user ? "/board" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;