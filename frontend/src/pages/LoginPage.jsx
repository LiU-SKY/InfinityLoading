import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({ onLogin }) {
  // 입력한 사용자 이름을 저장하는 상태 변수
  const [username, setUsername] = useState('');

  // 페이지 이동을 도와주는 함수 (리액트 라우터 훅)
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = () => {
    // 이름을 입력하지 않았으면 경고창 띄우고 함수 종료
    if (!username) return alert('이름 입력하세요');

    // 부모 컴포넌트(App)에 로그인된 사용자 이름 전달
    onLogin(username);

    // 로그인 성공하면 게시판 페이지('/board')로 이동
    navigate('/board');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>로그인 / 회원가입</h2>

      {/* 사용자 이름 입력란 */}
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}  // 상태 변수와 입력란 값을 연결
        onChange={(e) => setUsername(e.target.value)} // 입력할 때마다 상태 업데이트
      />

      {/* 로그인 확인 버튼 */}
      <button onClick={handleLogin}>확인</button>
    </div>
  );
}

export default Auth;