import { useQuery } from '@tanstack/react-query';
import axiosInstanse from '../api/apiInstanse';
import { API_ENDPOINTS } from '../constants/api';

const getDefaultParams = () => ({
  keyword: '',
  sort: 'createdAt',
  order: 'DESC',
  page: 1,
  take: 10,
});

export const useProductList = (params = {}) => {
  const queryParams = { ...getDefaultParams(), ...params };

  return useQuery({
    queryKey: ['products', queryParams],
    queryFn: async () => {
      // console.log(`${API_ENDPOINTS.PRODUCT.LIST}?page=${page}&take=${take}`);
      const { keyword, order, sort, page, take } = queryParams;

      const { data } = await axiosInstanse.get(
        `${API_ENDPOINTS.PRODUCT.LIST}?keyword=${keyword}&sort=${sort}&order=${order}&page=${page}&take=${take}`,
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
