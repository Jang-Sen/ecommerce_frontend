import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/api';
import Cookies from 'js-cookie';
import { useAuth } from '../context/authContext';
import axiosInstanse from '../api/apiInstanse';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstanse.post(
        API_ENDPOINTS.AUTH.SIGNUP,
        userData,
      );

      return data.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error Is Signup: ', error);
    },
  });
};

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await axiosInstanse.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      return data;
    },
    onSuccess: (data) => {
      Cookies.set('accessToken', data.accessToken, {
        expires: 1,
        secure: true,
      });

      login(data.accessToken);

      navigate('/profile');
    },
    onError: (error) => {
      console.error('Error Is Login: ', error.response.data.message);
    },
  });
};
