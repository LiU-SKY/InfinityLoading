# 보안성 검토 보고서

이 문서는 '무한로딩' 프로젝트의 소스 코드를 기반으로 분석한 보안 검토 결과입니다. 각 항목은 위험도, 설명, 그리고 해결 방안을 포함합니다.

---

## 1. 저장형 크로스 사이트 스크립팅 (Stored XSS)

- **위험도**: **CRITICAL (매우 위험)**
- **위치**:
    - `backend/src/main/java/com/onezero/infinityloading/backend/service/PostService.java`
    - `frontend/src/components/PostDetail.jsx`

- **설명**:
    게시글 작성 시 사용되는 마크다운 변환 기능에 **HTML 필터링(Sanitization) 로직이 없습니다.** 공격자가 게시글 내용에 `<script>alert('XSS')</script>` 또는 `<img src=x onerror=alert(1)>` 와 같은 악의적인 스크립트를 포함하여 저장할 수 있습니다.
    이후 다른 사용자가 해당 게시글을 조회하면, `PostDetail.jsx`의 `dangerouslySetInnerHTML`에 의해 이 스크립트가 그대로 실행됩니다. 이로 인해 세션 토큰 탈취, 악성 사이트 리디렉션 등 심각한 피해가 발생할 수 있습니다.

- **개선 방안**:
    백엔드에서 마크다운을 HTML로 변환한 후, 반드시 **HTML 정화(Sanitization)** 라이브러리를 사용하여 잠재적으로 위험한 태그와 속성을 제거해야 합니다.
    1.  `build.gradle`에 HTML Sanitizer 라이브러리를 추가합니다. (예: OWASP Java HTML Sanitizer)
        ```groovy
        implementation 'com.googlecode.owasp-java-html-sanitizer:owasp-java-html-sanitizer:20211018.2'
        ```
    2.  `PostService.java`의 `markdownToHtml` 메서드를 수정하여, HTML 변환 후 정화 로직을 추가합니다.
        ```java
        import org.owasp.html.PolicyFactory;
        import org.owasp.html.Sanitizers;
        // ...

        public String markdownToHtml(String markdown){
            // 1. Markdown -> HTML 변환
            Parser parser = Parser.builder().build();
            Node document = parser.parse(markdown);
            HtmlRenderer renderer = HtmlRenderer.builder().build();
            String unsafeHtml = renderer.render(document);

            // 2. HTML 정화 (Sanitization)
            PolicyFactory policy = Sanitizers.FORMATTING.and(Sanitizers.BLOCKS);
            String safeHtml = policy.sanitize(unsafeHtml);

            return safeHtml;
        }
        ```

---

## 2. 부적절한 인증 및 인가

- **위험도**: **HIGH (위험)**
- **위치**: `backend/src/main/java/com/onezero/infinityloading/backend/config/SecurityConfig.java`

- **설명**:
    Spring Security 설정에서 게시글 작성/수정/삭제(`POST`, `PUT`, `DELETE`)가 필요한 `/post/**` 경로가 `permitAll()`로 설정되어 있습니다.
    ```java
    .requestMatchers("/users/**", "/post/**").permitAll()
    ```
    이는 인증이 필요한 API에 대해 1차 방어선이 없는 것과 같습니다. 현재는 `JwtFilter`와 서비스 계층의 권한 검증 로직이 2차, 3차 방어선 역할을 하고 있지만, 설정 오류나 로직 변경 시 인증을 우회할 수 있는 심각한 취약점이 될 수 있습니다.

- **개선 방안**:
    HTTP 메서드별로 엔드포인트 접근 권한을 명확하게 분리해야 합니다.
    - `GET` 요청은 허용하되, `POST`, `PUT`, `DELETE` 요청은 최소 `isAuthenticated()` (인증된 사용자)로 설정해야 합니다.
    - `SecurityConfig`를 다음과 같이 수정하는 것을 권장합니다.
    ```java
    import org.springframework.http.HttpMethod;
    // ...

    .authorizeHttpRequests(auth -> auth
        // User API: 회원가입, 로그인은 모두 허용
        .requestMatchers("/users/register", "/users/login").permitAll()
        // Post API:
        // - GET 요청은 모두 허용
        .requestMatchers(HttpMethod.GET, "/post/**").permitAll()
        // - POST, PUT, DELETE 요청은 인증된 사용자만 허용
        .requestMatchers(HttpMethod.POST, "/post").authenticated()
        .requestMatchers(HttpMethod.PUT, "/post/**").authenticated()
        .requestMatchers(HttpMethod.DELETE, "/post/**").authenticated()
        // 그 외 모든 요청은 인증 필요
        .anyRequest().authenticated()
    )
    ```

---

## 3. 클라이언트 측 민감 정보 저장

- **위험도**: **MEDIUM (보통)**
- **위치**: `frontend/src/api/axios.js`, `frontend/src/App.jsx`

- **설명**:
    JWT 토큰을 `localStorage`에 저장하고 있습니다. `localStorage`는 JavaScript로 쉽게 접근할 수 있어, XSS 공격에 성공한 공격자가 토큰을 탈취하여 사용자를 사칭할 수 있습니다.

- **개선 방안**:
    - **단기적 해결책**: 현재 구조를 유지하되, XSS 취약점(항목 1)을 반드시 해결하여 토큰 탈취의 근본 원인을 차단해야 합니다.
    - **장기적/근본적 해결책**: 보안을 강화하려면 `HttpOnly` 속성을 가진 쿠키에 토큰을 저장하는 방식을 고려할 수 있습니다. `HttpOnly` 쿠키는 JavaScript로 접근이 불가능하여 XSS 공격으로부터 토큰을 보호할 수 있습니다. 단, 이 경우 CSRF(Cross-Site Request Forgery) 공격에 대한 방어(예: CSRF 토큰 사용)가 추가로 필요하며, 백엔드에서 쿠키를 생성하여 응답 헤더에 설정해주어야 합니다.

---

## 4. 기타 보안 권장 사항

- **위험도**: **LOW (낮음)**

- **4.1. JWT Secret Key 관리**
    - **설명**: 현재 JWT 시크릿 키가 `application.properties`에 하드코딩되어 있습니다. 이 파일이 Git에 포함될 경우 시크릿 키가 외부에 노출될 수 있습니다. (`.gitignore`에 `*.properties`가 없어 보입니다.)
    - **개선 방안**: 운영 환경에서는 환경 변수 또는 외부 Secrets Manager(예: AWS Secrets Manager, HashiCorp Vault)를 통해 시크릿 키를 주입받는 것이 안전합니다. `.gitignore`에 `application.properties`를 추가하고, 개발용 `application.properties.example` 파일을 제공하는 것을 권장합니다.

- **4.2. 입력값 검증 부재**
    - **설명**: 컨트롤러에서 `@RequestBody`로 받는 객체(`Post`, `User`)에 대해 별도의 입력값 검증(예: 길이, 형식, 빈 값 여부)이 없습니다.
    - **개선 방안**: `spring-boot-starter-validation` 의존성을 추가하고, DTO(Data Transfer Object)의 필드에 `@NotBlank`, `@Size`, `@Email` 등과 같은 Bean Validation 어노테이션을 사용하여 입력값을 검증하는 계층을 추가하는 것이 좋습니다.
