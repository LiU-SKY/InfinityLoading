import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

function PostWritePage({ onAdd }) {
    const navigate = useNavigate();

    const handleSubmit = (post) => {
        onAdd(post);
        navigate('/board');
    };

    return <PostForm onSubmit={handleSubmit} />;
}

export default PostWritePage;
