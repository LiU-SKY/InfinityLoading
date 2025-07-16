# TEAM 무한로딩

> 대전대학교 개발동아리 '일영' 프론트엔드/백엔드 협업 프로젝트 2팀 무한로딩 입니다.

<br>

## 📖 프로젝트 개요

**무한로딩**은 Spring Boot와 React를 기반으로 한 간단한 게시판 서비스입니다. 사용자 인증(회원가입, 로그인)과 게시글 CRUD(생성, 읽기, 수정, 삭제) 기능을 제공하며, 마크다운을 지원하는 Tiptap 에디터를 통해 사용성을 높였습니다. 이 프로젝트는 프론트엔드와 백엔드 협업 과정을 학습하고, RESTful API 설계 및 JWT 기반 인증을 구현하는 것을 목표로 합니다.

<br>

## 🛠️ 기술 스택

| 구분      | 기술                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------ |
| **Backend**   | Java 17, Spring Boot 3.5.3, Spring Security, JPA, MySQL, JWT                                     |
| **Frontend**  | React 19, Vite, Axios, React Router, Tiptap Editor                                               |
| **Infra**     | Git, GitHub                                                                                      |

<br>

## 📂 프로젝트 구조

```
InfinityLoading/
├── 📁 backend/      # Spring Boot 백엔드 서버
│   ├── build.gradle
│   └── src/
├── 📁 frontend/     # React 프론트엔드
│   ├── package.json
│   └── src/
├── 📁 asset/        # 프로젝트 관련 이미지 및 문서
└── 📜 README.md
```

<br>

## 🚀 실행 방법

### 1. Backend Server

1.  `backend` 디렉토리로 이동합니다.
2.  `src/main/resources/application.properties` 파일에서 데이터베이스 설정을 확인 및 수정합니다.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
3.  아래 명령어를 실행하여 Spring Boot 애플리케이션을 시작합니다.
    ```bash
    ./gradlew bootRun
    ```

### 2. Frontend Server

1.  `frontend` 디렉토리로 이동합니다.
2.  아래 명령어를 실행하여 필요한 패키지를 설치합니다.
    ```bash
    npm install
    ```
3.  아래 명령어를 실행하여 개발 서버를 시작합니다.
    ```bash
    npm run dev
    ```
4.  브라우저에서 `http://localhost:5173`으로 접속합니다.

<br>

## 📝 API Endpoints

| Method | URL                | 설명                 | 인증     |
| ------ | ------------------ | -------------------- | -------- |
| `POST` | `/users/register`  | 회원가입             | 불필요   |
| `POST` | `/users/login`     | 로그인 (JWT 발급)    | 불필요   |
| `POST` | `/post`            | 새 게시글 작성       | 필요 (JWT) |
| `GET`    | `/post`            | 모든 게시글 조회     | 불필요   |
| `GET`    | `/post/{id}`       | 특정 게시글 조회     | 불필요   |
| `PUT`    | `/post/{id}`       | 게시글 수정          | 필요 (JWT) |
| `DELETE` | `/post/{id}`       | 게시글 삭제          | 필요 (JWT) |

<br>

## ✨ 화면 구성

| 로그인 | 회원가입 |
| --- | --- |
| <img src="./asset/web/image/로그인 페이지.png" width="400"/> | <img src="./asset/web/image/회원가입 페이지.png" width="400"/> |
| **게시물 목록** | **게시물 상세** |
| <img src="./asset/web/image/게시글 목록 페이지.png" width="400"/> | <img src="./asset/web/image/게시글 수정.png" width="400"/> |
| **게시물 작성** | |
| <img src="./asset/web/image/새 글 작성.png" width="400"/> | |

<br>

---

<details>
<summary>기존 README 내용 (팀 정보 및 목표)</summary>

# 👥 팀 명단

> 팀장: 조하늘
> 
> 팀원: 송찬의, 이현수, 남상은, 김다은

# 💭 공동 목표

> **1. 게시판 제작**
>
> - 프론트엔드(FE)와 백엔드(BE) 협업 및 연결
> - 주요 게시판 기능 세부 구현

> **2. GitHub 연동 및 포트폴리오 활용**
> 
> - GitHub 연동 및 브랜치 협업
> - `README.md` 작성 → 포트폴리오에 활용

# 💭 개인 목표

> **하늘** : 프론트와 백엔드의 연결과 DB구조 이해, 팀워크 향상

> **상은** : 프로젝트를 통하여 협업 능력을 기르고, 백엔드에 대한 이해도 향상

> **다은** : 프로젝트를 진행하며 몰랐던 부분과 미숙한 부분을 배우며 실력 향상과 결과물 도출

> **현수** : 개발자로서 부족한 부분을 현실적으로 인지하고 발전해나가기 위한 목표와 프로젝트 결과물 도출

> **찬의** : _(작성 필요)_

# 💭 진행 방식

- **정기회의 : 월, 목 (주 2회) 14시**
- **기능 역할 분담 후, git 연동 - branch로 각자 맡은 파트 개발**

# 💭 프로젝트 기능

> **📝 게시판**
> 
> - (메인) 글 목록
> - 최소 기능 : 글 작성, 글 조회, 글 목록, 글 삭제, 글 수정,
> - 추가 기능 : 검색, 페이지 번호, 필터링, 카테고리, 조회수
> 
> 🙍‍♂️ **회원**
> 
> - 최소 기능 : 로그인, 회원가입, 로그아웃
> - 추가 기능 : 내 글 보기/삭제, 작성자검색, 작성자표시
> - 권한 정책
>     - 회원 : 작성/조회 가능
>     - 비회원 : 조회만 가능
> 
> 💬 **댓글**
> 
> - 기능 예정 : 댓글 작성/삭제, 작성자 표시 등

</details>