import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import './PostWritePage.css';

function PostWritePage({ onAdd }) {
    const navigate = useNavigate();

    const handleSubmit = (post) => {
        onAdd(post);
        navigate('/board');
    };

    return (
        <div className="page-container">
            <PostForm onSubmit={handleSubmit} />
        </div>
    );
}

export default PostWritePage;
