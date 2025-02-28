import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../constants/api';
import axiosInstanse from '../api/apiInstanse';

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // const token = Cookies.get('accessToken');
      //
      // if (!token) {
      //   throw new Error('No AccessToken Available.');
      // }

      // const config = {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // };
      const { data } = await axiosInstanse.get(API_ENDPOINTS.AUTH.USER_INFO);

      console.log(data.body);
      return data.body;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지
  });
};
