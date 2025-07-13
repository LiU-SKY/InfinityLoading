import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import PostDetail from '../components/PostDetail';



function PostDetailPage({ posts, onDelete }) {

    const { id } = useParams();

    const navigate = useNavigate();



    const post = posts.find(p => p.id === Number(id));

    if (!post) return <div className="page-container">글을 찾을 수 없습니다</div>;



    const handleDelete = () => {

        if (window.confirm('삭제하시겠습니까?')) {

            onDelete(post.id);

            navigate('/board');

        }

    };



    return (

        <div className="detail-container">

            <PostDetail

                post={post}

                onBack={() => navigate('/board')}

                onDelete={handleDelete}

                onEdit={() => navigate(`/edit/${post.id}`)}

            />

        </div>

    );

}



export default PostDetailPage;