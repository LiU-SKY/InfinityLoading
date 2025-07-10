import React, { useState } from 'react';
import Header from './Header.jsx';
import Auth from './Auth.jsx';
import Board from './Board.jsx';

function App() {
  const [user, setUser] = useState(null); // 로그인한 사용자
  const [page, setPage] = useState('auth'); // auth or board

  const handleLogin = (username) => {
    setUser(username);
    setPage('board');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('auth');
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      {user ? (
        <Board />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
