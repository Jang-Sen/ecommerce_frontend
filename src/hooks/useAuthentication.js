import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/api';

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, userData);

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
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      return data;
    },
    onSuccess: () => {
      alert('Success');
    },
    onError: (error) => {
      console.error('Error Is Login: ', error.response.data.message);
    },
  });
};
