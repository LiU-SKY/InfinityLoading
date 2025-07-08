import React, { useState } from 'react';
import PostList from './PostList.jsx';
import PostDetail from './PostDetail.jsx';
import PostForm from './PostForm.jsx';

function Board() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState('list'); // list, detail, write, edit
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAdd = (post) => {
    setPosts([post, ...posts]);
    setPage('list');
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    setPage('list');
  };

  const handleEdit = (editedPost) => {
    setPosts(posts.map((p) => (p.id === editedPost.id ? editedPost : p)));
    setPage('list');
  };

  return (
    <div>
      {page === 'list' && (
        <>
          <button onClick={() => setPage('write')}>글 작성</button>
          <PostList posts={posts} onSelect={(p) => { setSelectedPost(p); setPage('detail'); }} />
        </>
      )}
      {page === 'detail' && selectedPost && (
        <PostDetail
          post={selectedPost}
          onBack={() => setPage('list')}
          onDelete={() => handleDelete(selectedPost.id)}
          onEdit={() => setPage('edit')}
        />
      )}
      {page === 'write' && (
        <PostForm onSubmit={handleAdd} />
      )}
      {page === 'edit' && selectedPost && (
        <PostForm post={selectedPost} onSubmit={handleEdit} />
      )}
    </div>
  );
}

export default Board;
