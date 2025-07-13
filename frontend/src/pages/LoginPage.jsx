// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            return alert('이름과 비밀번호를 모두 입력하세요');
        }
        onLogin(username.trim());
        navigate('/board');
    };

    return (
        <div className="page-container"> {/* App.css의 .page-container 스타일 적용 */}
            <div className="login-box"> {/* LoginPage.css의 .login-box 스타일 적용 */}
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
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={handleLogin} style={{ flex:1 }}>로그인</button>
                    <button onClick={() => navigate('/signup')} style={{ flex:1, backgroundColor: '#6c757d' }}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;