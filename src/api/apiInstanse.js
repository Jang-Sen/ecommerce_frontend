import axios from 'axios';
import { BASE_URL } from '../constants/api';
import Cookies from 'js-cookie';

const axiosInstanse = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstanse.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstanse;
