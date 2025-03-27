export const BASE_URL = 'http://localhost/api/v1';
export const MOVIE_URL = 'https://api.themoviedb.org/3/movie';
export const DOMAIN_URL = 'https://jangsen.duckdns.org/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    EMAIL_SEND: `${BASE_URL}/auth/email/send`,
    EMAIL_CHECK: `${BASE_URL}/auth/email/check`,
    PASSWORD_FIND: `${BASE_URL}/auth/find/password`,
    PASSWORD_CHANGE: `${BASE_URL}/auth/change/password`,
    USER_INFO: `${BASE_URL}/auth`,
    REFRESH: `${BASE_URL}/auth/refresh`,
  },
  SOCIAL: {
    GOOGLE: `${BASE_URL}/auth/google`,
    NAVER: `${BASE_URL}/auth/naver`,
    KAKAO: `${BASE_URL}/auth/kakao`,
  },
  PRODUCT: {
    LIST: `${BASE_URL}/product/all`,
    DETAIL: `${BASE_URL}/product/:id`,
  },
  MOVIE: {
    LIST: `${MOVIE_URL}/now_playing`,
    DETAIL: `${MOVIE_URL}/:id`,
  },
  USER: {
    UPDATE_PROFILE: `${BASE_URL}/user`,
  },
};
