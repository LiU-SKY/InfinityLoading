// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // LoginPage 전용 CSS

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            return alert('이름과 비밀번호를 모두 입력하세요');
        }
        // 실제 로그인 로직(예: 서버 통신, 비밀번호 검증)은 여기에 추가
        // 현재는 간단히 사용자 이름으로 로그인 처리
        onLogin(username.trim()); // 부모 컴포넌트(App.js)의 user 상태 업데이트
        navigate('/board'); // 게시판 페이지로 이동
    };

    return (
        <div className="page-container"> {/* App.css의 .page-container 스타일 적용 */}
            <div className="login-box"> {/* LoginPage.css의 .login-box 스타일 적용 */}
                <h2>로그인</h2> {/* "로그인 / 회원가입" 문구에서 "로그인"으로 변경 */}
                <input
                    type="text"
                    placeholder="사용자 이름"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" // type을 password로 설정하여 입력 시 문자를 숨김
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* 버튼들을 가로로 나란히 배치하기 위한 flex 컨테이너 */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={handleLogin} style={{ flex: 1 }}>로그인</button> {/* 버튼 텍스트 변경 및 flex:1로 공간 분배 */}
                    <button onClick={() => navigate('/signup')} style={{ flex: 1 }}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;