import React from 'react';

import '../pages/PostDetailPage.css';



function PostDetail({ post, onBack, onDelete, onEdit }) {

    return (

        <div>

            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>

                <button onClick={onBack}>뒤로가기</button>

                <button onClick={onEdit}>수정</button>

                <button onClick={onDelete}>삭제</button>

            </div>

        </div>

    );

}



export default PostDetail;