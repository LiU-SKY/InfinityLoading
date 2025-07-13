import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import './PostEditPage.css'; // 페이지 전용 CSS

function PostEditPage({ posts, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find(p => p.id === Number(id));
  if (!post) {
    return <div className="page-container">수정할 글을 찾을 수 없습니다</div>;
  }

  const handleSubmit = (edited) => {
    onEdit(edited);
    navigate('/board');
  };

  return (
      <div className="page-container">
        <PostForm post={post} onSubmit={handleSubmit} />
      </div>
  );
}

export default PostEditPage;
