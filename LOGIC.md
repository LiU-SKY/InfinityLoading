# 무한로딩 프로젝트 기능별 로직 설명

이 문서는 "무한로딩" 게시판 프로젝트의 주요 기능들이 어떤 흐름으로 동작하는지 프론트엔드와 백엔드 관점에서 상세히 설명합니다.

## 1. 사용자 인증 (Authentication)

### 1.1. 회원가입 (Signup)

**프론트엔드 (`SignupPage.jsx`)**
1.  사용자가 이름, 비밀번호, 비밀번호 확인을 입력합니다.
2.  '가입하기' 버튼을 클릭하면 `handleSignup` 함수가 실행됩니다.
3.  입력값 유효성(빈 값, 비밀번호 일치)을 검증합니다.
4.  `apiClient.post('/users/register', { username, password })`를 통해 백엔드에 회원가입을 요청합니다.
5.  요청이 성공하면 "회원가입 성공" 알림을 띄우고 로그인 페이지(`/login`)로 이동합니다.

**백엔드**
1.  **Controller (`UserController.java`)**: `POST /users/register` 요청을 `register` 메서드로 받습니다.
2.  요청 본문(body)에서 `username`과 `password`를 추출하여 `UserService`의 `register` 메서드에 전달합니다.
3.  **Service (`UserService.java`)**:
    - `BCryptPasswordEncoder`를 사용해 사용자가 입��한 비밀번호(`rawPassword`)를 암호화합니다.
    - 암호화된 비밀번호로 `User` 객체를 생성합니다.
    - `userRepository.save(user)`를 호출하여 사용자 정보를 데이터베이스에 저장합니다.
4.  성공적으로 저장되면 컨트롤러는 "회원가입 성공" 메시지와 함께 HTTP 200 응답을 반환합니다.

---

### 1.2. 로그인 (Login) & JWT 발급

**프론트엔드 (`LoginPage.jsx`, `App.jsx`, `axios.js`)**
1.  사용자가 이름과 비밀번호를 입력하고 '로그인' 버튼을 클릭하면 `handleLogin` 함수가 실행됩니다.
2.  `apiClient.post('/users/login', { username, password })`를 통해 백엔드에 로그인을 요청합니다.
3.  **요청 성공 시 (토큰 수신):**
    - `App.jsx`의 `onLogin` 함수가 백엔드로부터 받은 JWT 토큰으로 호출됩니다.
    - `handleLogin` 함수는 토큰을 `localStorage`에 저장합니다.
    - `jwt-decode` 라이브러리로 토큰을 해석하여 사용자 정보(이름, 역할)를 추출하고 `user` 상태를 업데이트합니다.
    - `user` 상태가 업데이트되면 `useEffect` 훅이 실행되어 게시글 목록을 불러오고, 사용자는 게시판 페이지(`/board`)로 이동합니다.
4.  **API 요청 시 토큰 사용 (`axios.js`):**
    - `axios` 요청 인터셉터는 모든 API 요청 전에 `localStorage`에서 토큰을 확인합니다.
    - 토큰이 존재하면 요청 헤더에 `Authorization: Bearer {token}`을 추가하여 전송합니다.

**백엔드**
1.  **Controller (`UserController.java`)**: `POST /users/login` 요청을 `login` 메서드로 받습니다.
2.  `UserService`의 `login` 메서드를 호출하여 사용자 인증을 시도합니다.
3.  **Service (`UserService.java`)**:
    - `userRepository.findByUsername()`으로 사용자를 조회합니다. 사용자가 없으면 예외를 발생시킵니다.
    - `passwordEncoder.matches()`를 사용해 입력된 비밀번호와 DB에 저장된 암호화된 비밀번호를 비교합니다. 일치하지 않으면 예외를 발생시킵니다.
    - 인증에 성공하면 `User` 객체를 컨트롤러로 반환합니다.
4.  **Controller (`UserController.java`)**:
    - 인증된 `User` 객체를 받으면 `JwtUtil`의 `generateToken` 메서드를 호출하여 JWT를 생성합니다.
    - 생성된 토큰을 HTTP 200 응답의 본문에 담아 프론트엔드로 전송합니다.

---

### 1.3. JWT 인증 필터 (JWT Filter)

**백엔드 (`JwtFilter.java`, `SecurityConfig.java`)**
1.  프론트엔드에서 API 요청이 들어오면 `SecurityConfig`에 등록된 `JwtFilter`가 가장 먼저 동작합니다.
2.  `/users/register`, `/users/login` 등 인증이 필요 없는 경로는 필터를 그냥 통과시킵니다.
3.  그 외의 경로에 대해서는 요청 헤더에서 `Authorization: Bearer ...` 토큰을 확인합니다.
4.  **토큰이 있는 경우:**
    - `JwtUtil.validateTokenAndGetClaims()`를 통해 토큰의 유효성을 검증하고, 토큰에 담긴 정보(claims)를 추출합니다.
    - 추출한 사용자 이름과 역할을 `HttpServletRequest`에 속성으로 저장하여, 이후 컨트롤러에서 사용할 수 있게 합니다. (`request.setAttribute("username", username)`)
    - Spring Security의 `SecurityContextHolder`에 인증 정보를 등록하여, 해당 요청이 인증되었음을 시스템에 알립니다.
5.  **토큰이 없거나 유효하지 않은 경우:**
    - `SecurityConfig`의 설정에 따라 접근이 거부되거나, `JwtFilter`에서 401 Unauthorized 오류를 응답할 수 있습니다.

## 2. 게시글 (Post)

### 2.1. 게시글 목록 조회

**프론트엔드 (`App.jsx`, `BoardPage.jsx`)**
1.  사용자가 로그인에 성공하면 `App.jsx`의 `useEffect` 훅이 `fetchPosts` 함수를 호출합니다.
2.  `fetchPosts` 함수는 `apiClient.get('/post')`를 통해 백엔드에 모든 게시글 조회를 요청합니다.
3.  수신한 게시글 목록을 `id` 기준 내림차순(최신순)으로 정렬하여 `posts` 상태에 저장합니다.
4.  `BoardPage`는 `posts` 상태를 받아 `PostList` 컴포넌트를 통해 화면에 목록을 렌더링합니다.

**백엔드 (`PostController.java`, `PostService.java`)**
1.  `GET /post` 요청을 `PostController`의 `readAll` 메서드가 받습니다.
2.  `PostService`의 `findAll` 메서드를 호출합니다.
3.  `postRepository.findAll()`을 통해 데이터베이스의 모든 게시글을 조회하여 반환합니다.

---

### 2.2. 게시글 상세 조회 및 조회수 증가

**프론트엔드 (`PostDetailPage.jsx`)**
1.  사용자가 게시글 목록에서 특정 항목을 클릭하면, 해당 게시글의 `id`를 포함한 경로(`/post/{id}`)로 이동합니다.
2.  `PostDetailPage`는 `useParams` 훅으로 `id`를 추출하고, `useEffect` 내에서 `apiClient.get('/post/{id}')`를 호출하여 특정 게시글 정보를 요청합니다.
3.  백엔드로부터 받은 게시글 데이터를 `post` 상태에 저장하고, 화면에 렌더링합니다.

**백엔드 (`PostController.java`, `PostService.java`, `Post.java`)**
1.  `GET /post/{id}` 요청을 `PostController`의 `readOne` 메서드가 받습니다.
2.  `PostService`의 `findById(id)` 메서드를 호출합니다.
3.  **`@Transactional` 서비스 메서드:**
    - `postRepository.findById(id)`로 게시글 엔티티를 조회합니다.
    - 조회된 `Post` 엔티티의 `increaseViewCount()` 메서드를 호출하여 `views` 필드 값을 1 증가시킵니다.
    - 메서드가 종료될 때, JPA의 **변경 감지(Dirty Checking)** 기능이 `views` 값의 변경을 인지하고, 데이터베이스에 자동으로 `UPDATE` 쿼리를 실행하여 조회수를 저장합니다.
4.  조회수가 업데이트된 `Post` 객체를 프론트엔드로 반환합니다.

---

### 2.3. 게시글 작성

**프론트엔드 (`PostWritePage.jsx`, `App.jsx`)**
1.  사용자가 제목과 내용을 입력하고 '작성' 버튼을 누르면 `handleSubmit` 함수가 실행됩니다.
2.  `App.jsx`의 `onAdd` (즉, `handleAddPost`) 함수가 `postData`와 함께 호출됩니다.
3.  `handleAddPost` 함수는 `apiClient.post('/post', postData)`를 통해 백엔드에 새 게시글 생성을 요청합니다.
4.  요청이 성공하면 `fetchPosts`를 다시 호출하여 게시글 목록을 갱신하고, 사용자는 게시판 페이지로 이동합니다.

**백엔드 (`PostController.java`, `PostService.java`)**
1.  `POST /post` 요청을 `PostController`의 `create` 메서드가 받습니다.
2.  `JwtFilter`를 통해 `HttpServletRequest`에 저장된 사용자 이름(`username`)을 가져옵니다.
3.  **마크다운 변환**: `PostService`의 `markdownToHtml` 메서드를 호출하여 본문 내용을 HTML로 변환합니다.
4.  `PostService`의 `save` 메��드를 호출합니다. 이 때, `post` 객체와 `username`을 전달합니다.
5.  `save` 메서드는 `post` 객체에 작성자(`writer`)를 설정한 후, `postRepository.save(post)`를 통해 데이터베이스에 저장합니다.
6.  저장된 `Post` 객체를 프론트엔드로 반환합니다.

---

### 2.4. 게시글 수정

**프론트엔드 (`PostEditPage.jsx`, `App.jsx`)**
1.  사용자가 '수정' 버튼을 누르면 `/edit/{id}` 경로로 이동합니다.
2.  `PostEditPage`는 `useEffect`를 통해 기존 게시글 데이터를 불러와 폼을 채웁니다.
3.  사용자가 내용을 수정한 뒤 '수정' 버튼을 누르면 `handleSubmit` 함수가 실행됩니다.
4.  `App.jsx`의 `onEdit` (즉, `handleEditPost`) 함수가 `id`와 수정된 `postData`와 함께 호출됩니다.
5.  `handleEditPost` 함수는 `apiClient.put('/post/{id}', postData)`를 통해 백엔드에 수정을 요청합니다.
6.  요청이 성공하면 목록을 갱신하고 게시판 페이지로 돌아갑니다.

**백엔드 (`PostController.java`, `PostService.java`)**
1.  `PUT /post/{id}` 요청을 `PostController`의 `update` 메서드가 받습니다.
2.  컨트롤러는 `username`을 request에서 가져오고, 본문을 HTML로 변환한 뒤 `PostService`의 `update` 메서드를 호출합니다.
3.  **`@Transactional` 서비스 메서드:**
    - `postRepository.findById(id)`로 수정할 게시글을 조회합니다.
    - 요청을 보낸 사용자가 게시글의 작성자이거나 관리자(`ADMIN`)인지 확인하여 **권한을 검증**합니다.
    - 권한이 있으면, 조회된 `Post` 엔티티의 `title`과 `content`를 새로운 데이터로 변경합니다.
    - 메서드가 종료될 때, 변경 감지에 의해 자동으로 `UPDATE` 쿼리가 실행됩니다.
4.  수정된 `Post` 객체를 프론트엔드로 반환합니다.

---

### 2.5. 게시글 삭제

**프론트엔드 (`PostDetailPage.jsx`, `App.jsx`)**
1.  사용자가 '삭제' 버튼을 누르고 확인 창에서 '확인'을 선택하면 `handleDelete` 함수가 실행됩니다.
2.  `App.jsx`의 `onDelete` (즉, `handleDeletePost`) 함수가 `id`와 함께 호출됩니다.
3.  `handleDeletePost` 함수는 `apiClient.delete('/post/{id}')`를 통해 백엔드에 삭제를 요청합니다.
4.  요청이 성공하면 목록을 갱신하고 게시판 페이지로 이동합니다.

**백엔드 (`PostController.java`, `PostService.java`)**
1.  `DELETE /post/{id}` 요청을 `PostController`의 `delete` 메서드가 받습니다.
2.  컨트롤러는 `username`을 request에서 가져와 `PostService`의 `delete` 메서드를 호출합니다.
3.  **`@Transactional` 서비스 메서드:**
    - `postRepository.findById(id)`로 삭제할 게시글을 조회합니다.
    - 수정과 동일하게 **권한을 검증**합니다.
    - `postRepository.delete(post)`를 호출하여 데이터베이스에서 해당 게시글을 삭제합니다.
4.  성공적으로 삭제되면 HTTP 200 응답을 반환합니다.
