import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (!username) return alert('이름 입력하세요');
    onLogin(username); // 그냥 이름만 받는 간단 로그인
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>로그인 / 회원가입</h2>
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>확인</button>
    </div>
  );
}

export default Auth;