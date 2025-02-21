export const BASE_URL = 'http://localhost/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    EMAIL_SEND: `${BASE_URL}/auth/email/send`,
    EMAIL_CHECK: `${BASE_URL}/auth/email/check`,
  },
  SOCIAL: {
    GOOGLE: `${BASE_URL}/auth/google`,
    NAVER: `${BASE_URL}/auth/naver`,
    KAKAO: `${BASE_URL}/auth/kakao`,
  },
};
