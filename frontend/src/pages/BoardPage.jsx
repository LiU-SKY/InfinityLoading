// BoardPage.jsx (예시)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardPage.css'; // 수정된 CSS 임포트

function BoardPage() {
    const navigate = useNavigate();

    // 임시 데이터 (실제로는 API 호출로 받아올 것입니다)
    const posts = [
        { id: 1, title: '게시글 제목 공간 1', author: '작성자1', date: '2025.07.14', views: 123 },
        { id: 2, title: '두 번째 게시글 제목은 좀 더 길 수 있습니다', author: '작성자2', date: '2025.07.13', views: 45 },
        { id: 3, title: '새로운 소식입니다! 중요한 정보가 있어요', author: '작성자3', date: '2025.07.12', views: 200 },
        { id: 4, title: '네 번째 글', author: '작성자4', date: '2025.07.11', views: 78 },
        { id: 5, title: '다섯 번째 글입니다', author: '작성자5', date: '2025.07.10', views: 30 },
        { id: 6, title: '여섯 번째 글', author: '작성자6', date: '2025.07.09', views: 99 },
        { id: 7, title: '일곱 번째 글', author: '작성자7', date: '2025.07.08', views: 150 },
        { id: 8, title: '여덟 번째 글', author: '작성자8', date: '2025.07.07', views: 60 },
        { id: 9, title: '아홉 번째 글', author: '작성자9', date: '2025.07.06', views: 10 },
        { id: 10, title: '열 번째 글', author: '작성자10', date: '2025.07.05', views: 25 },
    ];

    const handlePostClick = (id) => {
        navigate(`/post/${id}`); // PostDetailPage로 이동
    };

    const handleWritePost = () => {
        navigate('/write'); // PostWritePage로 이동
    };

    // 페이지네이션 관련 (예시)
    const totalPages = 5;
    const currentPage = 1; // 현재 페이지

    return (
        <div className="page-container"> {/* App.css의 .page-container를 사용 */}
            <div className="board-container">
                {/* 게시판 헤더 영역 */}
                <div className="board-header">
                    <h2>무한로딩 게시판</h2>
                    <button className="write-post-button" onClick={handleWritePost}>
                        글 작성
                    </button>
                </div>

                {/* 게시글 목록 */}
                <ul className="board-list">
                    {posts.map(post => (
                        <li key={post.id} className="board-list-item" onClick={() => handlePostClick(post.id)}>
                            <span className="post-title">{post.title}</span>
                            <div className="post-meta">
                                <span>작성자: {post.author}</span>
                                <span>{post.date}</span>
                                <span>조회수: {post.views}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* 페이지네이션 */}
                <div className="pagination">
                    <button>&lt; 이전</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => console.log(`페이지 ${index + 1} 클릭`)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button>다음 &gt;</button>
                </div>
            </div>
        </div>
    );
}

export default BoardPage;
