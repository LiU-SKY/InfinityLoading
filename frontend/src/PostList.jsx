import React from 'react';

function PostList({ posts, onSelect }) {
  if (posts.length === 0) return <p>글이 없습니다.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} onClick={() => onSelect(post)} style={{ cursor: 'pointer' }}>
          {post.title}
        </li>
      ))}
    </ul>
  );
}

export default PostList;
