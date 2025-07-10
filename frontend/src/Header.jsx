import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const isAdmin = user === 'admin'; // 관리자 확인 (간단한 조건)

  return (
    <header className="header">
      {/* 왼쪽: 로고 + 메뉴버튼 */}
      <div className="nav-left">
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <span onClick={() => navigate('/board')}>홈</span>
          <span onClick={() => navigate('/board')}>글목록</span>
          <span onClick={() => navigate('/write')}>글쓰기</span>
          {isAdmin && <span onClick={() => navigate('/admin')}>관리자</span>}
        </div>
      </div>

      {/* 오른쪽: 유저 정보 + 로그아웃 */}
      <div className="nav-right">
        <span className="welcome-text">{user}님 환영합니다</span>
        <button className="logout-btn" onClick={onLogout}>로그아웃</button>
      </div>
    </header>
  );
}

export default Header;
