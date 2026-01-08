import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/lib/firebase/firebaseClient';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

//재발급 전용 인스턴스(인터셉터 없음) → 무한루프 방지
const sessionApi = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetryConfig | undefined;

    if (status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No firebase user');

      const idToken = await user.getIdToken(true);

      //세션 재발급(인터셉터 없는 인스턴스로 호출)
      await sessionApi.post(
        '/api/v1/auth/session',
        {},
        { headers: { Authorization: `Bearer ${idToken}` } },
      );

      //원래 요청 재시도
      return api.request(original);
    } catch {
      window.location.href = '/signin';
      return Promise.reject(error);
    }
  },
);

export default api;
