import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import './LoginPage.css';

// 로그인 페이지 컴포넌트.
function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 로그인 버튼 클릭 시 실행되는 함수.
    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            return alert('이름과 비밀번호를 모두 입력하세요');
        }
        try {
            // 서버에 로그인 요청을 보냄.
            const response = await apiClient.post('/users/login', { username, password });
            // 로그인 성공 시, 부모 컴포넌트(App.jsx)의 onLogin 함수를 호출하여 토큰 전달.
            onLogin(response.data);
            // 게시판 페이지로 이동.
            navigate('/board');
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className="page-container">
            <div className="common-box">
                <h2>로그인</h2>
                <input
                    type="text"
                    placeholder="사용자 이름"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-box">
                    <button onClick={handleLogin} style={{ flex: 1 }}>로그인</button>
                    <button onClick={() => navigate('/signup')} style={{ flex: 1 }}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;