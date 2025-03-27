import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../constants/api';
import axiosInstanse from '../api/apiInstanse';

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['profile'],
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

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstanse.put(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        userData,
      );

      console.log('Data', data);
      console.log('Data Body', data.body);

      return data.body;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries(['profile']); // 업데이트 후 유저 데이터 새로고침
    },
  });
};
