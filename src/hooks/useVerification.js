import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api';

export const useEmailSend = () => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const { data, status } = await axios.post(API_ENDPOINTS.AUTH.EMAIL_SEND, {
        email,
      });

      return data;
    },
    onError: (error) => {
      console.error('Error Is Email Send: ', error.response.data.message);
    },
  });
};

export const useEmailCheck = () => {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.EMAIL_CHECK, {
        email,
        code,
      });

      return data;
    },
    onError: (error) => {
      console.error('Error Is Email Check: ', error.response.data.message);
    },
  });
};
