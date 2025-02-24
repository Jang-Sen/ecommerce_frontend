import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api';
import { useNavigate } from 'react-router-dom';

const usePasswordFind = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async ({ email }) => {
      const { data, status } = await axios.post(
        API_ENDPOINTS.AUTH.PASSWORD_FIND,
        {
          email,
        },
      );

      console.log(data);
      console.log(status);

      return data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const usePasswordChange = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ token, password }) => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, {
        token,
        password,
      });

      return data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export { usePasswordFind, usePasswordChange };
