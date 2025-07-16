# 📝 조회수 및 게시글 번호 표시 기능 설명서

이 문서는 게시글의 조회수와 고유 번호(ID)가 백엔드에서 어떻게 관리되고, 프론트엔드에서 어떻게 표시 및 활용되는지 설명합니다.

---

### 1. 조회수 (View Count) 구현 방식

조회수 기능은 사용자가 게시글을 조회할 때마다 카운트를 1씩 증가시키는 기능입니다.

#### **가. 백엔드 (데이터 생성 및 관리)**

1.  **`Post.java` (데이터 모델)**
    -   게시글의 조회수 정보를 저장하기 위해 `Post` 엔티티에 `views` 필드를 추가했습니다. 이 필드는 게시글이 처음 생성될 때 0으로 초기화됩니다.
    ```java
    @Column(nullable = false)
    private int views = 0;
    ```

2.  **`PostService.java` (비즈니스 로직)**
    -   특정 게시글을 조회하는 `findById(Long id)` 메소드에 `@Transactional` 어노테이션을 적용했습니다.
    -   메소드 내부에서 게시글 데이터를 조회한 후, 해당 객체의 `increaseViewCount()` 메소드를 호출하여 `views` 값을 1 증가시킵니다.
    -   `@Transactional` 덕분에, 메소드가 성공적으로 종료되면 스프링이 객체의 변경사항(조회수 증가)을 감지하고 데이터베이스에 자동으로 업데이트(COMMIT)해줍니다.
    ```java
    @Transactional
    public Post findById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(...);
        post.increaseViewCount(); // 조회수 증가
        return post;
    }
    ```

#### **나. 프론트엔드 (데이터 표시)**

백엔드 API가 `views` 필드를 포함하여 게시글 데이터를 전달하면, 프론트엔드는 이 값을 화면에 렌더링합니다.

1.  **`PostList.jsx` (게시글 목록)**
    -   게시글 목록의 각 항목에 `post.views` 값을 표시합니다.
    ```jsx
    <div className="post-meta">
        <span className="post-writer">{post.writer}</span>
        <span className="post-views">조회수: {post.views}</span>
    </div>
    ```

2.  **`PostDetail.jsx` (게시글 상세)**
    -   게시글 상세 정보 영역에 `post.views` 값을 표시합니다.
    ```jsx
    <div className="post-meta-detail">
        <span className="post-writer">작성자: {post.writer}</span>
        <span className="post-views">조회수: {post.views}</span>
    </div>
    ```

---

### 2. 게시글 번호 (Post ID) 구현 방식

게시글 번호는 각 게시글을 유일하게 식별하는 고유 ID입니다.

#### **가. 백엔드 (고유 번호 생성)**

-   **`Post.java` (데이터 모델)**
    -   `id` 필드에 `@Id`와 `@GeneratedValue(strategy = GenerationType.IDENTITY)` 어노테이션을 사용했습니다.
    -   이는 새로운 게시글이 데이터베이스에 저장될 때마다, 데이터베이스 관리 시스템(예: MySQL, H2)이 **자동으로 1씩 증가하는 고유한 기본 키(Primary Key) 값을 생성하여 `id` 필드에 할당**하도록 설정한 것입니다.
    ```java
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    ```

#### **나. 프론트엔드 (고유 식별자로 활용)**

프론트엔드에서는 이 `id`를 화면에 직접 '번호'로 표시하기보다는, 각 게시글을 구분하고 특정 게시글에 접근하기 위한 **핵심 식별자(unique identifier)**로 사용합니다.

1.  **React 렌더링 최적화 (`key` prop)**
    -   `PostList.jsx`에서 `map` 함수로 목록을 렌더링할 때, 각 `<li>` 요소에 `key={post.id}`를 부여합니다. 이는 React가 목록의 어떤 항목이 변경, 추가 또는 삭제되었는지 효율적으로 식별하고 DOM을 업데이트하는 데 필수적인 값입니다.
    ```jsx
    {posts.map((post) => (
        <li key={post.id} onClick={() => onSelect(post)}>
            ...
        </li>
    ))}
    ```

2.  **페이지 이동 (라우팅)**
    -   사용자가 게시글 목록에서 특정 항목을 클릭하면, 해당 `post.id`를 URL 경로에 포함시켜 상세 페이지로 이동시킵니다.
    ```jsx
    // BoardPage.jsx
    const handleSelectPost = (post) => {
        navigate(`/post/${post.id}`); // 예: /post/15
    };
    ```

3.  **특정 데이터 요청**
    -   `PostDetailPage.jsx`에서는 `useParams()` 훅을 사용하여 URL 경로에서 `id` 값을 추출합니다.
    -   이 `id`를 사용하여 백엔드에 해당 게시글의 상세 데이터를 요청(`GET /post/{id}`)합니다.
    ```jsx
    // PostDetailPage.jsx
    const { id } = useParams(); // URL에서 '15'를 추출

    useEffect(() => {
        const fetchPost = async () => {
            // 추출한 id로 API 요청
            const response = await apiClient.get(`/post/${id}`);
            setPost(response.data);
        };
        fetchPost();
    }, [id]);
    ```
