# 🚀 무한로딩 게시판 API 명세서

Spring Boot와 React로 제작된 '무한로딩' 게시판 프로젝트의 REST API 명세서입니다.

- **Version:** 1.0.0
- **Base URL:** `http://localhost:8080`

---

## 🔐 인증 (Authentication)

본 API는 JWT (Bearer Token)를 사용한 인증 방식을 사용합니다.

- **Scheme:** `Bearer`
- **Header:** `Authorization: Bearer {YOUR_JWT_TOKEN}`

로그인이 필요한 모든 API 요청 시, HTTP 헤더에 위와 같은 형식으로 유효한 토큰을 포함해야 합니다.

---

## 📖 API Endpoints

### User API

#### `POST /users/register`
> **회원가입**

새로운 사용자를 시스템에 등록합니다. (인증 불필요)

**Request Body:** `application/json`
| Field | Type | Required | Description |
|---|---|---|---|
| `username` | string | **Yes** | 사용자 이름 |
| `password` | string | **Yes** | 비밀번호 |

*Example:*
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Responses:**
- **`200 OK`**: 회원가입 성공. "회원가입 성공" 문자열을 반환합니다.
- **`400 Bad Request`**: 잘못된 요청 (예: 이미 존재하는 사용자 이름).

---

#### `POST /users/login`
> **로그인**

사용자 인증 후 JWT를 발급합니다. (인증 불필요)

**Request Body:** `application/json`
| Field | Type | Required | Description |
|---|---|---|---|
| `username` | string | **Yes** | 사용자 이름 |
| `password` | string | **Yes** | 비밀번호 |

*Example:*
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Responses:**
- **`200 OK`**: 로그인 성공. 응답 본문에 JWT 토큰을 반환합니다.
- **`401 Unauthorized`**: 인증 실패 (아이디 또는 비밀번호 오류).

---

### Post API

#### `GET /post`
> **모든 게시글 조회**

시스템에 저장된 모든 게시글 목록을 조회합니다. (인증 불필요)

**Responses:**
- **`200 OK`**: 게시글 목록 조회 성공. `PostResponse` 객체의 배열을 반환합니다.

*Example Response Body:*
```json
[
  {
    "id": 2,
    "title": "두 번째 글",
    "content": "<h2>내용입니다.</h2>",
    "writer": "user2",
    "views": 5
  },
  {
    "id": 1,
    "title": "첫 번째 글",
    "content": "<h1>안녕하세요</h1>",
    "writer": "user1",
    "views": 12
  }
]
```

---

#### `POST /post`
> **새 게시글 작성**

새로운 게시글을 작성합니다. (인증 필요)

**Request Body:** `application/json`
| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | **Yes** | 게시글 제목 |
| `content` | string | **Yes** | 게시글 내용 (마크다운 형식) |

*Example:*
```json
{
  "title": "새로운 게시글 제목",
  "content": "## 마크다운으로 작성된 내용입니다."
}
```

**Responses:**
- **`200 OK`**: 게시글 작성 성공. 생성된 `PostResponse` 객체를 반환합니다.
- **`401 Unauthorized`**: 인증되지 않은 사용자.

---

#### `GET /post/{id}`
> **특정 게시글 조회**

ID를 사용하여 특정 게시글의 상세 정보를 조회합니다. 이 API 호출 시 해당 게시글의 조회수가 1 증가합니다. (인증 불필요)

**Path Parameters:**
| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer | **Yes** | 조회할 게시글의 ID |

**Responses:**
- **`200 OK`**: 게시글 조회 성공. `PostResponse` 객체를 반환합니다.
- **`404 Not Found`**: 해당 ID의 게시글을 찾을 수 없음.

---

#### `PUT /post/{id}`
> **게시글 수정**

ID를 사용하여 특정 게시글을 수정합니다. (작성자 또는 관리자만 가능)

**Path Parameters:**
| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer | **Yes** | 수정할 게시글의 ID |

**Request Body:** `application/json`
| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | **Yes** | 수정할 제목 |
| `content` | string | **Yes** | 수정할 내용 (마크다운 형식) |

**Responses:**
- **`200 OK`**: 게시글 수정 성공. 수정된 `PostResponse` 객체를 반환합니다.
- **`401 Unauthorized`**: 인증되지 않은 사용자.
- **`403 Forbidden`**: 권한 없음 (작성자 또는 관리자가 아님).
- **`404 Not Found`**: 해당 ID의 게시글을 찾을 수 없음.

---

#### `DELETE /post/{id}`
> **게시글 삭제**

ID를 사용하여 특정 게시글을 삭제합니다. (작성자 또는 관리자만 가능)

**Path Parameters:**
| Name | Type | Required | Description |
|---|---|---|---|
| `id` | integer | **Yes** | 삭제할 게시글의 ID |

**Responses:**
- **`200 OK`**: 게시글 삭제 성공.
- **`401 Unauthorized`**: 인증되지 않은 사용자.
- **`403 Forbidden`**: 권한 없음 (작성자 또는 관리자가 아님).
- **`404 Not Found`**: 해당 ID의 게시글을 찾을 수 없음.

---

## 📦 데이터 모델 (Schemas)

### PostResponse
게시글 정보를 담는 응답 객체입니다.

| Field | Type | Description |
|---|---|---|
| `id` | integer | 게시글의 고유 ID |
| `title` | string | 게시글 제목 |
| `content` | string | 게시글 내용 (HTML로 변환된 형식) |
| `writer` | string | 작성자 이름 |
| `views` | integer | 조회수 |

### ErrorResponse
API 에러 발생 시 공통으로 사용되는 응답 객체입니다.

| Field | Type | Description |
|---|---|---|
| `message` | string | 에러 메시지 |
