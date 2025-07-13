// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) return null; // user가 없으면 헤더를 렌더링하지 않음

  return (
      <header className="header">
        {/* 이 섹션은 현재 비워두고, 모든 요소를 nav-right로 이동 */}
        <div className="nav-left">
        </div>

        {/* 오른쪽: 유저 정보 + 글 작성 버튼 + 로그아웃 */}
        <div className="nav-right">
          <span className="welcome-text">{user}님 환영합니다</span>
          {/* '글 작성' 버튼 추가 */}
          <button className="write-post-btn" onClick={() => navigate('/write')}>글 작성</button>
          <button className="logout-btn" onClick={onLogout}>로그아웃</button>
        </div>
      </header>
  );
}

export default Header;