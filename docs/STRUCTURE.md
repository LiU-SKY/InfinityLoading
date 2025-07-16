# 📂 프로젝트 상세 구조 설명서

이 문서는 '무한로딩' 프로젝트의 전체 디렉터리 구조와 각 파일 및 폴더의 상세한 역할에 대해 설명합니다. (자동 생성되거나 개인 환경에 종속적인 파일은 제외)

```
InfinityLoading/
││
├── 📁 backend/             # Spring Boot 백엔드 서버
│   │
│   ├── build.gradle        # 백엔드 프로젝트의 의존성(라이브러리) 및 빌드 방법을 정의
│   ├── settings.gradle     # 멀티 모듈 프로젝트 설정 (현재는 단일 모듈)
│   ├── gradlew / gradlew.bat # Gradle 빌드 도구를 실행하는 스크립트
│   │
│   └── 📁 src/
│       └── 📁 main/
│           ├── 📁 java/com/onezero/infinityloading/backend/
│           │   │
│           │   ├── BackendApplication.java  # Spring Boot 애플리케이션의 시작점
│           │   │
│           │   ├── 📁 config/              # 프로젝트의 핵심 설정 클래스
│           │   │   ├── SecurityConfig.java # Spring Security 설정 (API 접근 권한, 필터 등록 등)
│           │   │   └── WebConfig.java      # 웹 관련 설정 (CORS 정책 등)
│           │   │
│           │   ├── 📁 controller/          # API 엔드포인트를 정의하고, 클라이언트의 요청을 받는 클래스
│           │   │   ├── PostController.java # 게시글 관련 API (/post)
│           │   │   └── UserController.java # 사용자 관련 API (/users)
│           │   │
│           │   ├── 📁 domain/              # 데이터베이스 테이블과 1:1로 매핑되는 객체(Entity)
│           │   │   ├── Post.java           # 게시글 데이터 모델
│           │   │   └── User.java           # 사용자 데이터 모델
│           │   │
│           │   ├── 📁 filter/              # API 요청을 처리하기 전에 거치는 필터
│           │   │   └── JwtFilter.java      # JWT 인증 토큰을 검증하는 필터
│           │   │
│           │   ├── 📁 repository/          # 데이터베이스에 직접 접근(CRUD)하는 JPA 인터페이스
│           │   │   ├── PostRepository.java
│           │   │   └── UserRepository.java
│           │   │
│           │   ├── 📁 service/             # 실제 비즈니스 로직을 처리하는 클래스
│           │   │   ├── PostService.java    # 게시글 관련 로직 (조회수 증가, 권한 검증 등)
│           │   │   └── UserService.java    # 사용자 관련 로직 (회원가입, 로그인 등)
│           │   │
│           │   └── 📁 util/                # 보조 기능을 담당하는 유틸리티 클래스
│           │       └── JwtUtil.java        # JWT 생성, 검증, 정보 추출 기능
│           │
│           └── 📁 resources/
│               └── application.properties   # 데이터베이스 연결 정보, JWT 비밀 키 등 서버의 주요 설정
│
│
├── 📁 frontend/             # React 프론트엔드
│   │
│   ├── package.json        # 프론트엔드 프로젝트의 정보, 의존성, 실행 스크립트 정의
│   ├── vite.config.js      # Vite 빌드 도구 설정 파일
│   ├── eslint.config.js    # 코드 스타일 및 문법 검사(ESLint) 규칙 설정
│   ├── index.html          # 웹 애플리케이션의 기본 HTML 템플릿 (React 앱이 마운트되는 곳)
│   │
│   └── 📁 src/
│       │
│       ├── main.jsx          # React 애플리케이션을 실제 DOM에 렌더링하는 시작점
│       ├── App.jsx           # 전체 애플리케이션의 최상위 컴포넌트, 라우팅 및 전역 상태 관리
│       ├── Header.jsx        # 페이지 상단에 표시되는 헤더 컴포넌트
│       ├── index.css         # 애플리케이션 전역에 적용되는 기본 CSS
│       │
│       ├── 📁 api/
│       │   └── axios.js      # 모든 API 요청을 관리하는 중앙 Axios 클라이언트 (인터셉터 포함)
│       │
│       ├── 📁 assets/         # React 컴포넌트에서 사용하는 이미지, 아이콘 등 정적 자원
│       │
│       ├── 📁 components/     # 여러 페이지에서 재사용되는 작은 UI 단위
│       │   ├── PostDetail.jsx  # 게시글 상세 내용을 보여주는 컴포넌트
│       │   ├── PostForm.jsx    # 게시글 작성 및 수정을 위한 폼 컴포넌트
│       │   └── PostList.jsx    # 게시글 목록을 리스트 형태로 보여주는 컴포넌트
│       │
│       └── 📁 pages/          # 특정 URL 경로에 해당하는 페이지 단위의 컴포넌트
│           ├── BoardPage.jsx       # 게시글 목록 전체를 보여주는 페이지
│           ├── LoginPage.jsx       # 로그인 페이지
│           ├── PostDetailPage.jsx  # 게시글 상세 보기 페이지
│           ├── PostEditPage.jsx    # 게시글 수정 페이지
│           ├── PostWritePage.jsx   # 새 글 작성 페이지
│           └── SignupPage.jsx      # 회원가입 페이지
│
└── README.md               # 프로젝트의 개요, 실행 방법, 팀원 정보 등을 담고 있는 메인 문서
```