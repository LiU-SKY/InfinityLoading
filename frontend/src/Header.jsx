import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// 페이지 상단에 표시되는 헤더 컴포넌트.
function Header({ user, onLogout }) {
    const navigate = useNavigate();

    // user 객체가 없으면(비로그인 상태) 아무것도 렌더링하지 않음.
    if (!user) return null;

    return (
        <header className="header">
            <div className="nav-left">
                {/* 로고나 다른 메뉴 등을 위한 왼쪽 공간 */}
                <span className="board-title" onClick={() => navigate('/board')}> 🔄 무한로딩 게시판 </span>
            </div>

            <div className="nav-right">
                {/* user 객체의 username 속성을 사용해 환영 메시지를 표시 */}
                <span className="welcome-text">{user.username}님 환영합니다</span>
                <button className="write-post-btn" onClick={() => navigate('/write')}>글 작성</button>
                <button className="logout-btn" onClick={onLogout}>로그아웃</button>
            </div>
        </header>
    );
}

export default Header;
