import React from 'react';

function Header({ user, onLogout }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#f0f0f0',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc'
    }}>
      <span style={{ fontWeight: 'bold' }}>{user}님 환영합니다</span>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
}

export default Header;
