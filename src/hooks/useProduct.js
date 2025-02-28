import { useQuery } from '@tanstack/react-query';
import axiosInstanse from '../api/apiInstanse';
import { API_ENDPOINTS } from '../constants/api';

export const useProductList = ({ page, take } = { page: 1, take: 10 }) => {
  return useQuery({
    queryKey: ['products', page, take],
    queryFn: async () => {
      // console.log(`${API_ENDPOINTS.PRODUCT.LIST}?page=${page}&take=${take}`);
      const { data } = await axiosInstanse.get(
        `${API_ENDPOINTS.PRODUCT.LIST}?page=${page}&take=${take}`,
      );

      // console.log(data);
      return data.body;
    },
    retry: false,
  });
};

export const useProductDetail = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosInstanse.get(
        API_ENDPOINTS.PRODUCT.DETAIL.replace(':id', id),
      );

      return data.body;
    },
  });
};
