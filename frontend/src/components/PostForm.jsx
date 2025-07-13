import React, { useState } from 'react';



function PostForm({ post, onSubmit }) {

    const [title, setTitle] = useState(post?.title || '');

    const [content, setContent] = useState(post?.content || '');



    const handleSubmit = () => {

        if (!title.trim() || !content.trim()) {

            return alert('제목과 내용을 입력하세요');

        }

        onSubmit({

            id: post?.id || Date.now(),

            title: title.trim(),

            content: content.trim(),

        });

    };



    return (

        <div style={{ padding: 20 }}>

            <input

                type="text"

                placeholder="제목"

                value={title}

                onChange={e => setTitle(e.target.value)}

                style={{ width: '100%', marginBottom: 10 }}

            />

            <textarea

                placeholder="내용"

                value={content}

                onChange={e => setContent(e.target.value)}

                rows={5}

                style={{ width: '100%' }}

            />

            <div style={{ textAlign: 'center', marginTop: 20 }}>

                <button onClick={handleSubmit}>{post ? '수정' : '작성'}</button>

            </div>

        </div>

    );

}



export default PostForm;