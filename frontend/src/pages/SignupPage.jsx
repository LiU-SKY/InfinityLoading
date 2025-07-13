import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './SignupPage.css';



function SignupPage({ onSignup }) {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const navigate = useNavigate();



    const handleSignup = () => {

        if (!username.trim() || !password.trim()) {

            return alert('이름과 비밀번호를 모두 입력하세요');

        }

        onSignup({ username, password });

        navigate('/login');

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

                    onChange={(e) => setPassword(e.target.value)}

                />

                <button onClick={handleSignup}>가입하기</button>

            </div>

        </div>

    );

}



export default SignupPage;
