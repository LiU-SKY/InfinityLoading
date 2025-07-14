import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import './SignupPage.css';
import '../App.css';


// 회원가입 페이지 컴포넌트.
function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passchek, setPasschek] = useState('');
    const navigate = useNavigate();

    const isMatch = password === passchek;
    const textStyle = {
        color: isMatch ? 'green' : 'red',
        borderColor: password !== "" && isMatch ? 'green' : 'red',
    };

    // '가입하기' 버튼 클릭 시 실행되는 함수.
    const handleSignup = async () => {
        if (!username.trim() || !password.trim()) {
            return alert('이름과 비밀번호를 모두 입력하세요');
        }
        try {
            // 서버에 회원가입 요청을 보냄.
            await apiClient.post('/users/register', { username, password });
            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            // 회원가입 성공 후 로그인 페이지로 이동.
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('회원가입에 실패했습니다. 아이디가 이미 존재하거나 서버에 문제가 발생했습니다.');
        }
    };

    return (
        <div className="page-container">
            <div className="common-box">
                <h2>회원가입</h2>
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
                    style={textStyle}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호 재입력"
                    value={passchek}
                    onChange={(e) => setPasschek(e.target.value)}
                    style={textStyle}
                />
                <div className = "button-box">
                    <button onClick={handleSignup} style={{ flex: 1 }}>가입하기</button>
                    <button onClick={() => navigate('/login')} style={{ flex: 1 }}>로그인으로</button>
                </div>

            </div>
        </div>
    );
}

export default SignupPage;