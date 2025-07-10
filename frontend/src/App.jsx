import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Auth from './Auth';
import Board from './Board';
import PostForm from './PostForm.jsx';


function App() {
  const [user, setUser] = useState(null); // 로그인 사용자 상태

  return (
    <BrowserRouter>
      {/* 항상 보여지는 상단 바 */}
      <Header user={user} onLogout={() => setUser(null)} />

      <Routes>
        {/* 로그인 페이지 */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/board" /> : <Auth onLogin={setUser} />
          }
        />

        {/* 게시판 페이지 */}
        <Route
          path="/board"
          element={
            user ? <Board /> : <Navigate to="/login" />
          }
        />

        {/* 기본 루트는 로그인으로 리디렉트 */}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/write" element={user ? <PostForm /> : <Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
