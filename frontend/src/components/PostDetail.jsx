import React from 'react';
import '../pages/PostDetailPage.css';

// 게시글의 상세 내용을 보여주는 컴포넌트.
function PostDetail({ post, user, onBack, onDelete, onEdit }) {
    // 수정/삭제 권한이 있는지 확인 (작성자이거나 ADMIN).
    const canModify = user && (user.username === post.writer || user.role === 'ADMIN');

    return(
        <div className="" style={{display:"flex", flexDirection:"column", height:"100%"}}>
            <h2 id={"title"}>{post.title}</h2>
            <p className="post-writer" style={{alignSelf:"flex-end"}}>작성자: {post.writer}</p>
            {/* Tiptap 콘텐츠(HTML)를 렌더링 */}
            <div
                className="post-content ProseMirror"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="post-actions"  style={{alignSelf: "flex-end", marginTop: "auto", gap:"10px", display:"flex"}}>
                <button onClick={onBack}>목록으로</button>
                {/* 수정/삭제 권한이 있을 경우에만 버튼을 보여줌. */}
                {canModify && (
                    <>
                        <button onClick={onEdit}>수정</button>
                        <button onClick={onDelete} className="delete-button">삭제</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PostDetail;