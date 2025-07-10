import React from 'react';

function PostDetail({ post, onBack, onDelete, onEdit }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={onBack}>뒤로가기</button>
      <button onClick={onEdit}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

export default PostDetail;
