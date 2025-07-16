# 📝 프론트엔드 API 연동 및 사용 설명서

이 문서는 React 프론트엔드 애플리케이션이 백엔드 REST API와 어떻게 통신하는지, 그 구조와 실제 사용법을 설명합니다.

API 연동의 핵심은 **`axios` 라이브러리**를 사용하여 HTTP 요청을 보내고 받는 것이며, 재사용성과 유지보수성을 높이기 위해 **중앙 집중화된 API 클라이언트**를 설정하여 사용합니다.

---

### 1. 중앙 API 클라이언트: `api/axios.js`

모든 API 요청 로직을 한 곳에서 관리하기 위해, `axios`의 기본 설정을 담은 인스턴스를 생성하여 사용합니다.

-   **파일 위치**: `frontend/src/api/axios.js`

#### **가. 주요 기능 및 코드**

1.  **`axios` 인스턴스 생성**:
    -   `axios.create()`를 사용하여 프로젝트 전용 `axios` 클라이언트를 만듭니다.
    -   `baseURL`: 모든 요청에 대한 기본 서버 주소(`http://localhost:8080`)를 설정합니다. 이를 통해 각 컴포넌트에서는 `/post`, `/users/login`처럼 전체 URL이 아닌 경로만 작성할 수 있어 코드가 간결해집니다.

2.  **요청 인터셉터 (Request Interceptor)**:
    -   **JWT 자동 첨부**: 이 클라이언트의 가장 중요한 기능입니다. `interceptors.request.use()`를 사용하여, 백엔드로 API 요청을 보내기 **직전**에 요청을 가로채는 로직을 설정합니다.
    -   이 로직은 브라우저의 `localStorage`에서 'token'을 가져와, 토큰이 존재할 경우 `Authorization: Bearer {token}` 형식으로 HTTP 헤더에 자동으로 추가합니다.
    -   덕분에, 인증이 필요한 API를 호출하는 모든 컴포넌트에서 매번 헤더를 설정하는 번거로운 작업을 할 필요가 없습니다.

```javascript
// frontend/src/api/axios.js
import axios from 'axios';

// 1. axios 인스턴스 생성 및 기본 설정
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 기본 서버 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. 요청 인터셉터 설정
apiClient.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져옴
        const token = localStorage.getItem('token');
        if (token) {
            // 토큰이 있으면 Authorization 헤더에 추가
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // 수정된 설정으로 요청을 계속 진행
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient; // 설정된 인스턴스를 내보내기
```

---

### 2. 컴포넌트에서의 API 사용 예시

컴포넌트에서는 위에서 설정한 `apiClient`를 `import`하여 간편하게 API를 호출합니다. 주로 `useEffect` 훅 안에서 비동기 함수(`async/await`)와 함께 사용됩니다.

#### **가. 데이터 조회 (GET)**

-   **파일**: `PostDetailPage.jsx`
-   **설명**: `useEffect`를 사용하여 페이지가 렌더링될 때, `apiClient.get()`으로 특정 게시글의 정보를 서버에 요청합니다.

```jsx
// pages/PostDetailPage.jsx
import apiClient from '../api/axios'; // 중앙 클라이언트 import

function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // baseURL이 설정되어 있으므로 '/post/{id}'만 작성
                const response = await apiClient.get(`/post/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("게시글 로딩 실패:", error);
            }
        };
        fetchPost();
    }, [id]);
    // ...
}
```

#### **나. 데이터 생성 (POST)**

-   **파일**: `LoginPage.jsx`
-   **설명**: '로그인' 버튼 클릭 시, `handleLogin` 함수�� `apiClient.post()`를 통해 사용자 이름과 비밀번호를 서버로 전송합니다.

```jsx
// pages/LoginPage.jsx
import apiClient from '../api/axios'; // 중앙 클라이언트 import

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await apiClient.post('/users/login', {
                username, // 요청 본문(body)에 데이터 포함
                password,
            });
            onLogin(response.data); // 부모 컴포넌트에 토큰 전달
        } catch (error) {
            alert('로그인에 실패했습니다.');
        }
    };
    // ...
}
```

#### **다. 데이터 삭제 (DELETE)**

-   **파일**: `App.jsx`
-   **설명**: `handleDeletePost` 함수는 `apiClient.delete()`를 호출하여 특정 ID의 게시글 삭제를 요청합니다. 이 요청에도 인터셉터가 자동으로 JWT를 헤더에 포함시켜주므로, 서버는 누가 삭제를 요청했는지 알 수 있습니다.

```jsx
// App.jsx
import apiClient from './api/axios'; // 중앙 클라이언트 import

function App() {
    const handleDeletePost = async (id) => {
        try {
            await apiClient.delete(`/post/${id}`);
            fetchPosts(); // 목록 새로고침
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
        }
    };
    // ...
}
```

---

### ✅ 요약

1.  **중앙 관리**: `api/axios.js`에서 API 클라이언트를 중앙에서 관리하여 코드 중복을 피하고 설정을 일관되게 유지합니다.
2.  **자동 인증**: 요청 인터셉터를 통해 JWT 인증 헤더를 모든 요청에 자동으로 추가하여, 컴포넌트 레벨에서는 인증 로직을 신경 쓸 필요가 없습니다.
3.  **간결한 사용**: 각 컴포넌트에서는 `apiClient`를 가져와 `get`, `post`, `put`, `delete` 등의 메소드를 사용하여 간결하고 명확하게 API와 통신합니다.
