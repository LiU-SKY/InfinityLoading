import './PostForm.css';

import React, { useState } from 'react';

function PostForm({ post, onSubmit }) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = () => {
    if (!title || !content) return alert('제목과 내용 입력');

    const newPost = {
      id: post?.id || Date.now(),
      title,
      content,
    };
    onSubmit(newPost);
  };

  return (
    <div className="containar">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        cols="50"
      ></textarea><br />
<div style={{ textAlign: 'center', marginTop: '20px' }}>
  <button onClick={handleSubmit}>{post ? '수정' : '작성'}</button>
</div>

    </div>
  );
}

export default PostForm;
