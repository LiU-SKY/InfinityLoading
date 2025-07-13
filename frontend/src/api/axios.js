import axios from 'axios';

// 백엔드 API와 통신하기 위한 axios 인스턴스 생성.
const apiClient = axios.create({
    // 모든 요청의 기본 URL 설정.
    baseURL: 'http://localhost:8080',
    // 모든 요청의 기본 헤더 설정. JSON 형식으로 통신.
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터(Request Interceptor) 설정.
// 모든 API 요청이 서버로 전송되기 전에 이 코드를 거침.
apiClient.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 'token'을 가져옴.
        const token = localStorage.getItem('token');
        // 토큰이 존재하면,
        if (token) {
            // HTTP 요청 헤더의 'Authorization' 필드에 'Bearer' 토큰을 추가.
            // 이를 통해 서버는 해당 요청이 인증된 사용자의 요청임을 알 수 있음.
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 요청 설정 중 에러가 발생하면 Promise를 통해 에러를 반환.
        return Promise.reject(error);
    }
);

export default apiClient;